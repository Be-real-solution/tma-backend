import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { NewImageCreateManyRequest, NewImageCreateRequest, NewImageDeleteManyRequest, NewImageDeleteRequest, NewImageGetAllRequest, NewImageGetOneResponse } from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class NewImageRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: NewImageGetAllRequest): Promise<NewImageGetOneResponse[]> {
		const newImages = await this.prisma.newImage.findMany({
			where: { deletedAt: null, newId: payload.newId },
			select: { id: true, imageLink: true, newId: true, createdAt: true },
			orderBy: [{ createdAt: 'desc' }],
		})

		return newImages
	}

	async create(payload: NewImageCreateRequest): Promise<MutationResponse> {
		const newImage = await this.prisma.newImage.create({
			data: { newId: payload.newId, imageLink: payload.imageLink },
		})
		return newImage
	}

	async createMany(payload: NewImageCreateManyRequest): Promise<null> {
		await this.prisma.newImage.createMany({
			data: payload.datas.map((p) => ({ newId: p.newId, imageLink: p.imageLink })),
		})
		return null
	}

	async delete(payload: NewImageDeleteRequest): Promise<MutationResponse> {
		await this.prisma.newImage.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}

	async deleteMany(payload: NewImageDeleteManyRequest): Promise<null> {
		await this.prisma.newImage.updateMany({
			where: { deletedAt: null, id: { in: payload.ids } },
			data: { deletedAt: new Date() },
		})

		return null
	}
}
