import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	AdminCreateRequest,
	AdminDeleteRequest,
	AdminGetAllRequest,
	AdminGetAllResponse,
	AdminGetOneByIdRequest,
	AdminGetOneRequest,
	AdminGetOneResponse,
	AdminUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class AdminRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: AdminGetAllRequest): Promise<AdminGetAllResponse | AdminGetOneResponse[]> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				take: payload.pageSize,
				skip: (payload.pageNumber - 1) * payload.pageSize,
			}
		}

		const admins = await this.prisma.admin.findMany({
			where: {
				deletedAt: null,
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				username: { contains: payload.username, mode: 'insensitive' },
				type: payload.type,
			},
			select: { id: true, fullName: true, username: true, type: true, createdAt: true },
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const adminsCount = await this.prisma.admin.count({
				where: {
					deletedAt: null,
					fullName: { contains: payload.fullName, mode: 'insensitive' },
					username: { contains: payload.username, mode: 'insensitive' },
					type: payload.type,
				},
			})

			return {
				pagesCount: Math.ceil(adminsCount / payload.pageSize),
				pageSize: admins.length,
				data: admins,
			}
		} else {
			return admins
		}
	}

	async getOneById(payload: AdminGetOneByIdRequest): Promise<AdminGetOneResponse> {
		const admin = await this.prisma.admin.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: { id: true, fullName: true, username: true, type: true, createdAt: true },
		})

		return admin
	}

	async getOne(payload: AdminGetOneRequest): Promise<AdminGetOneResponse> {
		const admin = await this.prisma.admin.findFirst({
			where: { deletedAt: null, id: payload.id, fullName: payload.fullName, username: payload.username, type: payload.type },
			select: { id: true, fullName: true, username: true, type: true, createdAt: true },
		})

		return admin
	}

	async create(payload: AdminCreateRequest): Promise<MutationResponse> {
		const admin = await this.prisma.admin.create({
			data: { fullName: payload.fullName, username: payload.username, password: payload.password, type: payload.type },
		})

		return { id: admin.id }
	}

	async update(payload: AdminUpdateRequest & AdminGetOneByIdRequest): Promise<MutationResponse> {
		const admin = await this.prisma.admin.update({
			where: { deletedAt: null, id: payload.id },
			data: { fullName: payload.fullName, username: payload.username, password: payload.password, type: payload.type },
		})

		return { id: admin.id }
	}

	async delete(payload: AdminDeleteRequest): Promise<MutationResponse> {
		await this.prisma.admin.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
