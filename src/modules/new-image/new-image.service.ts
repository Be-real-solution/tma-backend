import { Injectable } from '@nestjs/common'
import { NewImageRepo } from './new-image.repo'
import { NewImageCreateRequest, NewImageDeleteRequest, NewImageGetAllRequest, NewImageGetOneResponse } from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class NewImageService {
	private readonly repo: NewImageRepo
	constructor(repo: NewImageRepo) {
		this.repo = repo
	}

	async getAll(payload: NewImageGetAllRequest): Promise<NewImageGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async create(payload: NewImageCreateRequest): Promise<MutationResponse> {
		return this.repo.create(payload)
	}

	async delete(payload: NewImageDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}
}
