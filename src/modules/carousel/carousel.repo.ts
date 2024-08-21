import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	CarouselCreateRequest,
	CarouselDeleteRequest,
	CarouselGetAllRequest,
	CarouselGetAllResponse,
	CarouselGetOneByIdRequest,
	CarouselGetOneRequest,
	CarouselGetOneResponse,
	CarouselUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class CarouselRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: CarouselGetAllRequest & { ids?: string[] }): Promise<CarouselGetAllResponse | CarouselGetOneResponse[]> {
		let paginationOptions = {}
		if (payload.pagination) {
			paginationOptions = {
				take: payload.pageSize,
				skip: (payload.pageNumber - 1) * payload.pageSize,
			}
		}

		const carousels = await this.prisma.carousel.findMany({
			where: {
				deletedAt: null,
				name: { contains: payload.name, mode: 'insensitive' },
				description: { contains: payload.description, mode: 'insensitive' },
				isActive: payload.isActive,
			},
			select: { id: true, name: true, description: true, isActive: true, imageLink: true, createdAt: true },
			...paginationOptions,
			orderBy: [{ createdAt: 'desc' }],
		})

		if (payload.pagination) {
			const carouselsCount = await this.prisma.carousel.count({
				where: {
					deletedAt: null,
					name: { contains: payload.name, mode: 'insensitive' },
					description: { contains: payload.description, mode: 'insensitive' },
					isActive: payload.isActive,
				},
			})

			return {
				pagesCount: Math.ceil(carouselsCount / payload.pageSize),
				pageSize: carousels.length,
				data: carousels,
			}
		} else {
			return carousels
		}
	}

	async getOneById(payload: CarouselGetOneByIdRequest): Promise<CarouselGetOneResponse> {
		const carousel = await this.prisma.carousel.findFirst({
			where: { deletedAt: null, id: payload.id },
			select: { id: true, name: true, description: true, isActive: true, imageLink: true, createdAt: true },
		})

		return carousel
	}

	async getOne(payload: CarouselGetOneRequest): Promise<CarouselGetOneResponse> {
		const carousel = await this.prisma.carousel.findFirst({
			where: {
				deletedAt: null,
				name: payload.name,
				description: payload.description,
				isActive: payload.isActive,
			},
			select: { id: true, name: true, description: true, isActive: true, imageLink: true, createdAt: true },
		})

		return carousel
	}

	async create(payload: CarouselCreateRequest): Promise<MutationResponse> {
		const carousel = await this.prisma.carousel.create({
			data: {
				name: payload.name['en'] || Object.keys(payload.name)[0] || '',
				description: payload.description['en'] || Object.keys(payload.description)[0] || '',
				imageLink: payload.image,
			},
		})
		return carousel
	}

	async update(payload: CarouselUpdateRequest & CarouselGetOneByIdRequest): Promise<MutationResponse> {
		const carousel = await this.prisma.carousel.update({
			where: { deletedAt: null, id: payload.id },
			data: {
				name: payload.name?.en ?? undefined,
				description: payload.description?.en ?? undefined,
				imageLink: payload.image,
			},
		})
		return carousel
	}

	async delete(payload: CarouselDeleteRequest): Promise<MutationResponse> {
		await this.prisma.carousel.update({
			where: { deletedAt: null, id: payload.id },
			data: { deletedAt: new Date() },
		})

		return payload
	}
}
