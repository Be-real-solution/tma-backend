import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	BuildingCreateRequest,
	BuildingDeleteRequest,
	BuildingGetAllRequest,
	BuildingGetAllResponse,
	BuildingGetOneByIdRequest,
	BuildingGetOneRequest,
	BuildingGetOneResponse,
	BuildingUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class BuildingRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: BuildingGetAllRequest): Promise<BuildingGetAllResponse | BuildingGetOneResponse[]> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				take: payload.pageSize,
				skip: (payload.pageNumber - 1) * payload.pageSize,
			}
		}

		const buildings = await this.prisma.building.findMany({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				address: { contains: payload.address, mode: 'insensitive' },
				phoneNumber: { contains: payload.phoneNumber, mode: 'insensitive' },
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
			},
			select: { id: true, name: true, address: true, imageLink: true, phoneNumber: true, workEndTime: true, workStartTime: true, createdAt: true },
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const buildingsCount = await this.prisma.building.count({
				where: {
					deletedAt: null,
					name: { contains: payload.name, mode: 'insensitive' },
					address: { contains: payload.address, mode: 'insensitive' },
					phoneNumber: { contains: payload.phoneNumber, mode: 'insensitive' },
					workEndTime: payload.workEndTime,
					workStartTime: payload.workStartTime,
				},
			})

			return {
				pagesCount: Math.ceil(buildingsCount / payload.pageSize),
				pageSize: buildings.length,
				data: buildings,
			}
		} else {
			return buildings
		}
	}

	async getOneById(payload: BuildingGetOneByIdRequest): Promise<BuildingGetOneResponse> {
		const building = await this.prisma.building.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: { id: true, name: true, address: true, imageLink: true, phoneNumber: true, workEndTime: true, workStartTime: true, createdAt: true },
		})

		return building
	}

	async getOne(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.prisma.building.findFirst({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				address: { contains: payload.address, mode: 'insensitive' },
				phoneNumber: { contains: payload.phoneNumber, mode: 'insensitive' },
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
			},
			select: { id: true, name: true, address: true, imageLink: true, phoneNumber: true, workEndTime: true, workStartTime: true, createdAt: true },
		})

		return building
	}

	async getOneWithOr(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.prisma.building.findFirst({
			where: { OR: [{ name: payload.name, address: payload.address, phoneNumber: payload.phoneNumber }] },
			select: { id: true, name: true, address: true, imageLink: true, phoneNumber: true, workEndTime: true, workStartTime: true, createdAt: true },
		})

		return building
	}

	async create(payload: BuildingCreateRequest): Promise<MutationResponse> {
		const building = await this.prisma.building.create({
			data: {
				name: payload.name,
				imageLink: payload.imageLink,
				address: payload.address,
				phoneNumber: payload.phoneNumber,
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
			},
		})
		return building
	}

	async update(payload: BuildingUpdateRequest & BuildingGetOneByIdRequest): Promise<MutationResponse> {
		const building = await this.prisma.building.update({
			where: { deletedAt: null, id: payload.id },
			data: {
				name: payload.name,
				imageLink: payload.imageLink,
				address: payload.address,
				phoneNumber: payload.phoneNumber,
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
			},
		})
		return building
	}

	async delete(payload: BuildingDeleteRequest): Promise<MutationResponse> {
		await this.prisma.building.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
