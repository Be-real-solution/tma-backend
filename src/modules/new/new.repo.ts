import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { NewCreateRequest, NewDeleteRequest, NewGetAllRequest, NewGetAllResponse, NewGetOneByIdRequest, NewGetOneRequest, NewGetOneResponse, NewUpdateRequest } from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class NewRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: NewGetAllRequest): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				take: payload.pageSize,
				skip: (payload.pageNumber - 1) * payload.pageSize,
			}
		}

		const news = await this.prisma.new.findMany({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				description: { contains: payload.description, mode: 'insensitive' },
				authorId: payload.authorId,
			},
			select: { id: true, name: true, description: true, authorId: true, viewsCount: true, createdAt: true },
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const newsCount = await this.prisma.new.count({
				where: {
					deletedAt: null,
					name: { contains: payload.name, mode: 'insensitive' },
					description: { contains: payload.description, mode: 'insensitive' },
					authorId: payload.authorId,
				},
			})

			return {
				pagesCount: Math.ceil(newsCount / payload.pageSize),
				pageSize: news.length,
				data: news,
			}
		} else {
			return news
		}
	}

	async getOneById(payload: NewGetOneByIdRequest): Promise<NewGetOneResponse> {
		const neww = await this.prisma.new.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: { id: true, name: true, description: true, authorId: true, viewsCount: true, createdAt: true },
		})

		return neww
	}

	async getOne(payload: NewGetOneRequest): Promise<NewGetOneResponse> {
		const neww = await this.prisma.new.findFirst({
			where: {
				deletedAt: null,
				name: payload.name,
				description: payload.description,
				authorId: payload.authorId,
			},
			select: { id: true, name: true, description: true, authorId: true, viewsCount: true, createdAt: true },
		})

		return neww
	}

	async create(payload: NewCreateRequest): Promise<MutationResponse> {
		const neww = await this.prisma.new.create({
			data: {
				name: payload.name,
				description: payload.description,
				authorId: payload.authorId,
			},
		})
		return neww
	}

	async update(payload: NewUpdateRequest & NewGetOneByIdRequest): Promise<MutationResponse> {
		const neww = await this.prisma.new.update({
			where: { deletedAt: null, id: payload.id },
			data: {
				name: payload.name,
				description: payload.description,
				authorId: payload.authorId,
				viewsCount: payload.viewsCount,
			},
		})
		return neww
	}

	async delete(payload: NewDeleteRequest): Promise<MutationResponse> {
		await this.prisma.new.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
