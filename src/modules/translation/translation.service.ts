import { Injectable } from '@nestjs/common'
import { TranslationRepo } from './translation.repo'
import { TranslationCreateRequest, TranslationDeleteRequest, TranslationGetOneByIdRequest, TranslationUpdateRequest } from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class TranslationService {
	private readonly repo: TranslationRepo
	constructor(repo: TranslationRepo) {
		this.repo = repo
	}

	async create(payload: TranslationCreateRequest): Promise<MutationResponse> {
		return this.repo.create(payload)
	}

	async update(param: TranslationGetOneByIdRequest, payload: TranslationUpdateRequest): Promise<MutationResponse> {
		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: TranslationDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}
}
