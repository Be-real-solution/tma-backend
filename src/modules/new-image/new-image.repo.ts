import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { NewImageCreateRequest, NewImageDeleteRequest, NewImageGetAllRequest, NewImageGetOneResponse } from './interfaces'
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

	async delete(payload: NewImageDeleteRequest): Promise<MutationResponse> {
		await this.prisma.newImage.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
