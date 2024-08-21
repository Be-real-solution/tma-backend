import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	CategoryCreateRequest,
	CategoryDeleteRequest,
	CategoryGetAllRequest,
	CategoryGetAllResponse,
	CategoryGetOneByIdRequest,
	CategoryGetOneRequest,
	CategoryGetOneResponse,
	CategoryUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class CategoryRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: CategoryGetAllRequest): Promise<CategoryGetAllResponse | CategoryGetOneResponse[]> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				take: payload.pageSize,
				skip: (payload.pageNumber - 1) * payload.pageSize,
			}
		}

		const categorys = await this.prisma.category.findMany({
			where: { deletedAt: null, name: { contains: payload.name, mode: 'insensitive' } },
			select: { id: true, name: true, createdAt: true },
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const categorysCount = await this.prisma.category.count({
				where: { deletedAt: null, name: { contains: payload.name, mode: 'insensitive' } },
			})

			return {
				pagesCount: Math.ceil(categorysCount / payload.pageSize),
				pageSize: categorys.length,
				data: categorys,
			}
		} else {
			return categorys
		}
	}

	async getOneById(payload: CategoryGetOneByIdRequest): Promise<CategoryGetOneResponse> {
		const category = await this.prisma.category.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: { id: true, name: true, createdAt: true },
		})

		return category
	}

	async getOne(payload: CategoryGetOneRequest): Promise<CategoryGetOneResponse> {
		const category = await this.prisma.category.findFirst({
			where: { deletedAt: null, id: payload.id, name: payload.name },
			select: { id: true, name: true, createdAt: true },
		})

		return category
	}

	async create(payload: CategoryCreateRequest): Promise<MutationResponse> {
		const category = await this.prisma.category.create({
			data: { name: payload.name },
		})

		return { id: category.id }
	}

	async update(payload: CategoryUpdateRequest & CategoryGetOneByIdRequest): Promise<MutationResponse> {
		const category = await this.prisma.category.update({
			where: { deletedAt: null, id: payload.id },
			data: { name: payload.name },
		})

		return { id: category.id }
	}

	async delete(payload: CategoryDeleteRequest): Promise<MutationResponse> {
		await this.prisma.category.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
