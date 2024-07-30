import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { TranslationCreateRequest, TranslationDeleteRequest, TranslationGetOneByIdRequest, TranslationUpdateRequest } from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class TranslationRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
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
}
