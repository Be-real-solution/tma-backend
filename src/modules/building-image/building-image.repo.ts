import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	BuildingImageCreateManyRequest,
	BuildingImageCreateRequest,
	BuildingImageDeleteManyRequest,
	BuildingImageDeleteRequest,
	BuildingImageGetAllRequest,
	BuildingImageGetOneResponse,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class BuildingImageRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: BuildingImageGetAllRequest): Promise<BuildingImageGetOneResponse[]> {
		const buildingImages = await this.prisma.buildingImage.findMany({
			where: { deletedAt: null, buildingId: payload.buildingId },
			select: { id: true, imageLink: true, buildingId: true, createdAt: true },
			orderBy: [{ createdAt: 'desc' }],
		})

		return buildingImages
	}

	async create(payload: BuildingImageCreateRequest): Promise<MutationResponse> {
		const buildingImage = await this.prisma.buildingImage.create({
			data: { buildingId: payload.buildingId, imageLink: payload.imageLink },
		})
		return buildingImage
	}

	async createMany(payload: BuildingImageCreateManyRequest): Promise<null> {
		await this.prisma.buildingImage.createMany({
			data: payload.datas.map((p) => ({ buildingId: p.buildingId, imageLink: p.imageLink })),
		})
		return null
	}

	async delete(payload: BuildingImageDeleteRequest): Promise<MutationResponse> {
		await this.prisma.buildingImage.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}

	async deleteMany(payload: BuildingImageDeleteManyRequest): Promise<null> {
		await this.prisma.buildingImage.updateMany({
			where: { deletedAt: null, id: { in: payload.ids } },
			data: { deletedAt: new Date() },
		})

		return null
	}
}
