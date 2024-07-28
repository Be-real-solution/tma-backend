import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	AuthorCreateRequest,
	AuthorDeleteRequest,
	AuthorGetAllRequest,
	AuthorGetAllResponse,
	AuthorGetOneByIdRequest,
	AuthorGetOneRequest,
	AuthorGetOneResponse,
	AuthorUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class AuthorRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: AuthorGetAllRequest): Promise<AuthorGetAllResponse | AuthorGetOneResponse[]> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				take: payload.pageSize,
				skip: (payload.pageNumber - 1) * payload.pageSize,
			}
		}

		const authors = await this.prisma.author.findMany({
			where: { deletedAt: null, fullName: { contains: payload.fullName, mode: 'insensitive' } },
			select: { id: true, fullName: true, createdAt: true },
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const authorsCount = await this.prisma.author.count({
				where: { deletedAt: null, fullName: { contains: payload.fullName, mode: 'insensitive' } },
			})

			return {
				pagesCount: Math.ceil(authorsCount / payload.pageSize),
				pageSize: authors.length,
				data: authors,
			}
		} else {
			return authors
		}
	}

	async getOneById(payload: AuthorGetOneByIdRequest): Promise<AuthorGetOneResponse> {
		const author = await this.prisma.author.findFirst({
			where: { deletedAt: null, id: payload.id },
		})

		return author
	}

	async getOne(payload: AuthorGetOneRequest): Promise<AuthorGetOneResponse> {
		const author = await this.prisma.author.findFirst({
			where: { deletedAt: null, id: payload.id, fullName: payload.fullName },
		})

		return author
	}

	async create(payload: AuthorCreateRequest): Promise<MutationResponse> {
		const author = await this.prisma.author.create({
			data: { fullName: payload.fullName },
		})

		return author
	}

	async update(payload: AuthorUpdateRequest & AuthorGetOneByIdRequest): Promise<MutationResponse> {
		const author = await this.prisma.author.update({
			where: { deletedAt: null, id: payload.id },
			data: { fullName: payload.fullName },
		})

		return author
	}

	async delete(payload: AuthorDeleteRequest): Promise<MutationResponse> {
		await this.prisma.author.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
