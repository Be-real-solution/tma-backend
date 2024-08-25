import { Injectable } from '@nestjs/common'
import { BuildingImageRepo } from './building-image.repo'
import {
	BuildingImageCreateManyRequest,
	BuildingImageCreateRequest,
	BuildingImageDeleteManyRequest,
	BuildingImageDeleteRequest,
	BuildingImageGetAllRequest,
	BuildingImageGetOneResponse,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class BuildingImageService {
	private readonly repo: BuildingImageRepo
	constructor(repo: BuildingImageRepo) {
		this.repo = repo
	}

	async getAll(payload: BuildingImageGetAllRequest): Promise<BuildingImageGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async create(payload: BuildingImageCreateRequest): Promise<MutationResponse> {
		return this.repo.create(payload)
	}

	async createMany(payload: BuildingImageCreateManyRequest): Promise<MutationResponse> {
		return this.repo.createMany(payload)
	}

	async delete(payload: BuildingImageDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}

	async deleteMany(payload: BuildingImageDeleteManyRequest): Promise<MutationResponse> {
		return this.repo.deleteMany(payload)
	}
}
