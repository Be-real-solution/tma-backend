import { BadRequestException, Injectable } from '@nestjs/common'
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
import { nextDay, setHoursTo0 } from '../../common/helpers'

@Injectable()
export class NewRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: NewGetAllRequest & { ids?: string[] }): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		let dateOptions = {}

		if (payload.startDate && payload.endDate) {
			dateOptions = {
				lte: setHoursTo0(payload.endDate),
				gte: setHoursTo0(payload.startDate),
			}
		} else if (payload.startDate) {
			dateOptions = {
				lte: nextDay(payload.startDate),
				gte: setHoursTo0(payload.startDate),
			}
		}

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
				adminId: payload.adminId,
				categories: { some: { id: { in: payload.categoryIds } } },
				isTop: payload.isTop,
				createdAt: { ...dateOptions },
			},
			select: {
				id: true,
				name: true,
				description: true,
				admin: { select: { id: true, fullName: true, username: true, type: true, createdAt: true } },
				categories: { select: { id: true, name: true, createdAt: true } },
				viewsCount: true,
				isTop: true,
				createdAt: true,
				mainImage: true,
				images: { where: { deletedAt: null }, select: { imageLink: true, id: true, createdAt: true } },
			},
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const newsCount = await this.prisma.new.count({
				where: {
					deletedAt: null,
					name: { contains: payload.name, mode: 'insensitive' },
					description: { contains: payload.description, mode: 'insensitive' },
					adminId: payload.adminId,
					categories: { some: { id: { in: payload.categoryIds } } },
					isTop: payload.isTop,
					createdAt: { ...dateOptions },
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
			select: {
				id: true,
				name: true,
				description: true,
				admin: { select: { id: true, fullName: true, username: true, type: true, createdAt: true } },
				categories: { select: { id: true, name: true, createdAt: true } },
				viewsCount: true,
				isTop: true,
				createdAt: true,
				mainImage: true,
				images: { where: { deletedAt: null }, select: { imageLink: true, id: true, createdAt: true } },
			},
		})

		return neww
	}

	async getOne(payload: NewGetOneRequest): Promise<NewGetOneResponse> {
		const neww = await this.prisma.new.findFirst({
			where: {
				deletedAt: null,
				name: payload.name,
				description: payload.description,
				adminId: payload.adminId,
				categories: { some: { id: { in: payload.categoryIds } } },
				isTop: payload.isTop,
			},
			select: {
				id: true,
				name: true,
				description: true,
				admin: { select: { id: true, fullName: true, username: true, type: true, createdAt: true } },
				categories: { select: { id: true, name: true, createdAt: true } },
				viewsCount: true,
				isTop: true,
				createdAt: true,
				mainImage: true,
				images: { where: { deletedAt: null }, select: { imageLink: true, id: true, createdAt: true } },
			},
		})

		return neww
	}

	async create(payload: NewCreateRequest): Promise<MutationResponse> {
		const admin = await this.prisma.admin.findFirst({ where: { deletedAt: null, id: payload.adminId } })
		if (!admin) {
			throw new BadRequestException('admin not found')
		}

		const categories = await this.prisma.category.findMany({ where: { deletedAt: null, id: { in: payload.categoryIds } }, select: { id: true } })
		if (!categories.length) {
			throw new BadRequestException('categories not found')
		}

		const neww = await this.prisma.new.create({
			data: {
				name: payload.name['en'] || Object.keys(payload.name)[0] || '',
				description: payload.description['en'] || Object.keys(payload.description)[0] || '',
				categories: { connect: categories },
				adminId: payload.adminId,
				isTop: payload.isTop,
				mainImage: payload.image,
			},
		})
		return { id: neww.id }
	}

	async update(payload: NewUpdateRequest & NewGetOneByIdRequest): Promise<MutationResponse> {
		if (payload.adminId) {
			const admin = await this.prisma.admin.findFirst({ where: { deletedAt: null, id: payload.adminId } })
			if (!admin) {
				throw new BadRequestException('admin not found')
			}
		}
		let categories
		if (payload?.categoryIds?.length) {
			categories = await this.prisma.category.findMany({ where: { deletedAt: null, id: { in: payload.categoryIds } }, select: { id: true } })
			if (!categories.length) {
				throw new BadRequestException('categories not found')
			}
		}
		let discategories
		if (payload?.categoryIdsToDelete?.length) {
			discategories = await this.prisma.category.findMany({ where: { deletedAt: null, id: { in: payload.categoryIdsToDelete } }, select: { id: true } })
		}

		const neww = await this.prisma.new.update({
			where: { deletedAt: null, id: payload.id },
			data: {
				name: payload.name?.en ?? undefined,
				description: payload.description?.en ?? undefined,
				categories: { connect: categories, disconnect: discategories },
				adminId: payload.adminId,
				viewsCount: payload.viewsCount,
				isTop: payload.isTop,
				mainImage: payload.image,
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
