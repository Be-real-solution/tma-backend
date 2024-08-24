import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	NewCreateRequest,
	NewDeleteRequest,
	NewGetAllRequest,
	NewGetAllResponse,
	NewGetOneByIdRequest,
	NewGetOneRequest,
	NewGetOneResponse,
	NewUpdateManyCarousel,
	NewUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class NewRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: NewGetAllRequest & { ids?: string[] }): Promise<NewGetAllResponse | NewGetOneResponse[]> {
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
				categoryId: payload.categoryId,
				isTop: payload.isTop,
			},
			select: { id: true, name: true, description: true, authorId: true, viewsCount: true, isTop: true, createdAt: true },
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
					categoryId: payload.categoryId,
					isTop: payload.isTop,
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
			select: { id: true, name: true, description: true, authorId: true, viewsCount: true, isTop: true, createdAt: true },
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
				categoryId: payload.categoryId,
				isTop: payload.isTop,
			},
			select: { id: true, name: true, description: true, authorId: true, viewsCount: true, isTop: true, createdAt: true },
		})

		return neww
	}

	async create(payload: NewCreateRequest): Promise<MutationResponse> {
		const neww = await this.prisma.new.create({
			data: {
				name: payload.name['en'] || Object.keys(payload.name)[0] || '',
				description: payload.description['en'] || Object.keys(payload.description)[0] || '',
				categoryId: payload.categoryId,
				authorId: payload.authorId,
				isTop: payload.isTop,
			},
		})
		return { id: neww.id }
	}

	async update(payload: NewUpdateRequest & NewGetOneByIdRequest): Promise<MutationResponse> {
		const neww = await this.prisma.new.update({
			where: { deletedAt: null, id: payload.id },
			data: {
				name: payload.name?.en ?? undefined,
				description: payload.description?.en ?? undefined,
				categoryId: payload.categoryId,
				authorId: payload.authorId,
				viewsCount: payload.viewsCount,
				isTop: payload.isTop,
			},
		})
		return { id: neww.id }
	}

	async updateManyCarousel(payload: NewUpdateManyCarousel): Promise<MutationResponse> {
		await this.prisma.new.updateMany({
			where: { deletedAt: null, id: { in: payload.ids } },
			data: { isTop: payload.isTop },
		})
		return { id: payload.ids[0] }
	}

	async delete(payload: NewDeleteRequest): Promise<MutationResponse> {
		await this.prisma.new.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
