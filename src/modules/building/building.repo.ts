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

	async getAll(payload: BuildingGetAllRequest & { ids?: string[] }): Promise<BuildingGetAllResponse | BuildingGetOneResponse[]> {
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
			select: {
				id: true,
				name: true,
				address: true,
				mainImage: true,
				phoneNumber: true,
				workEndTime: true,
				workStartTime: true,
				latitude: true,
				longitude: true,
				createdAt: true,
				images: { select: { imageLink: true } },
			},
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		const mappedBuildings = buildings.map((b) => {
			return { ...b, images: b?.images.map((i) => i.imageLink) }
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
				data: mappedBuildings,
			}
		} else {
			return mappedBuildings
		}
	}

	async getOneById(payload: BuildingGetOneByIdRequest): Promise<BuildingGetOneResponse> {
		const building = await this.prisma.building.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: {
				id: true,
				name: true,
				address: true,
				mainImage: true,
				phoneNumber: true,
				workEndTime: true,
				workStartTime: true,
				latitude: true,
				longitude: true,
				createdAt: true,
				images: { select: { imageLink: true } },
			},
		})

		return building ? { ...building, images: building?.images.map((i) => i.imageLink) } : null
	}

	async getOne(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.prisma.building.findFirst({
			where: {
				deletedAt: null,
				name: payload.name,
				address: payload.address,
				phoneNumber: payload.phoneNumber,
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
				latitude: payload.latutude,
				longitude: payload.longitude,
			},
			select: {
				id: true,
				name: true,
				address: true,
				mainImage: true,
				phoneNumber: true,
				workEndTime: true,
				workStartTime: true,
				latitude: true,
				longitude: true,
				createdAt: true,
				images: { select: { imageLink: true } },
			},
		})
		return building ? { ...building, images: building?.images.map((i) => i.imageLink) } : null
	}

	async getOneWithOr(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.prisma.building.findFirst({
			where: { OR: [{ name: payload.name, address: payload.address, phoneNumber: payload.phoneNumber }] },
			select: {
				id: true,
				name: true,
				address: true,
				mainImage: true,
				phoneNumber: true,
				workEndTime: true,
				workStartTime: true,
				latitude: true,
				longitude: true,
				createdAt: true,
				images: { select: { imageLink: true } },
			},
		})

		return building ? { ...building, images: building?.images.map((i) => i.imageLink) } : null
	}

	async create(payload: BuildingCreateRequest): Promise<MutationResponse> {
		const building = await this.prisma.building.create({
			data: {
				name: payload.name['en'] || Object.keys(payload.name)[0] || '',
				address: payload.address['en'] || Object.keys(payload.address)[0] || '',
				phoneNumber: payload.phoneNumber,
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
				latitude: payload.latitude,
				longitude: payload.longitude,
				mainImage: payload.image,
			},
		})
		return { id: building.id }
	}

	async update(payload: BuildingUpdateRequest & BuildingGetOneByIdRequest): Promise<MutationResponse> {
		const building = await this.prisma.building.update({
			where: { deletedAt: null, id: payload.id },
			data: {
				name: payload.name?.en ?? undefined,
				address: payload.address?.en ?? undefined,
				phoneNumber: payload.phoneNumber,
				workEndTime: payload.workEndTime,
				workStartTime: payload.workStartTime,
				latitude: payload.latitude,
				longitude: payload.longitude,
				mainImage: payload.image,
			},
		})
		return { id: building.id }
	}

	async delete(payload: BuildingDeleteRequest): Promise<MutationResponse> {
		await this.prisma.building.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
