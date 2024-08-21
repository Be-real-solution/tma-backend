import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import {
	TranslationCreateManyRequest,
	TranslationCreateRequest,
	TranslationDeleteRequest,
	TranslationGetAllRequest,
	TranslationGetOneByIdRequest,
	TranslationGetOneResponse,
	TranslationUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class TranslationRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getAll(payload: TranslationGetAllRequest): Promise<TranslationGetOneResponse[]> {
		let filteredText: string[] = []
		if (Array.isArray(payload.text)) {
			filteredText = payload.text.filter((t) => t !== undefined && t !== null)
		}
		const translations = await this.prisma.translation.findMany({
			where: {
				language: payload.language,
				tableField: { in: payload.tableFields },
				tableId: { in: payload.tableIds },
				...{ OR: filteredText.length ? filteredText.map((t) => ({ text: { contains: t, mode: 'insensitive' } })) : undefined },
			},
			select: { id: true, language: true, tableId: true, text: true, tableField: true },
		})

		return translations
	}

	async getAll2(payload: TranslationGetAllRequest): Promise<TranslationGetOneResponse[]> {
		const translations = await this.prisma.translation.findMany({
			where: {
				language: payload.language,
				tableField: { in: payload.tableFields },
				tableId: { in: payload.tableIds },
				text: { in: payload.text },
			},
			select: { id: true, language: true, tableId: true, text: true, tableField: true },
		})

		return translations
	}

	async create(payload: TranslationCreateRequest): Promise<MutationResponse> {
		const translation = await this.prisma.translation.create({
			data: {
				language: payload.language,
				tableField: payload.tableField,
				tableId: payload.tableId,
				text: payload.text,
			},
		})

		return translation
	}

	async createMany(payload: TranslationCreateManyRequest): Promise<null> {
		await this.prisma.translation.createMany({
			data: payload.datas.map((t) => ({
				language: t.language,
				tableField: t.tableField,
				text: t.text,
				tableId: t.tableId,
			})),
		})

		return null
	}

	async update(payload: TranslationUpdateRequest & TranslationGetOneByIdRequest): Promise<MutationResponse> {
		const translation = await this.prisma.translation.update({
			where: { id: payload.id },
			data: {
				language: payload.language,
				tableField: payload.tableField,
				tableId: payload.tableId,
				text: payload.text,
			},
		})

		return translation
	}

	async delete(payload: TranslationDeleteRequest): Promise<MutationResponse> {
		await this.prisma.translation.delete({
			where: { id: payload.id },
		})
		return payload
	}

	async deleteMany(payload: { tableId: string }): Promise<void> {
		await this.prisma.translation.deleteMany({
			where: { tableId: payload.tableId },
		})
	}
}
