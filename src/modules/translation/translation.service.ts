import { Injectable } from '@nestjs/common'
import { TranslationRepo } from './translation.repo'
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
export class TranslationService {
	private readonly repo: TranslationRepo
	constructor(repo: TranslationRepo) {
		this.repo = repo
	}

	async getAll(payload: TranslationGetAllRequest): Promise<TranslationGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async getAll2(payload: TranslationGetAllRequest): Promise<TranslationGetOneResponse[]> {
		return this.repo.getAll2(payload)
	}

	async create(payload: TranslationCreateRequest): Promise<MutationResponse> {
		return this.repo.create(payload)
	}

	async createMany(payload: TranslationCreateManyRequest): Promise<null> {
		return this.repo.createMany(payload)
	}

	async update(param: TranslationGetOneByIdRequest, payload: TranslationUpdateRequest): Promise<MutationResponse> {
		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: TranslationDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}

	async deleteMany(payload: { tableId: string }): Promise<void> {
		await this.repo.deleteMany(payload)
	}
}
