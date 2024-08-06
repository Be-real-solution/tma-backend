import { BadRequestException, Injectable } from '@nestjs/common'
import { CategoryRepo } from './category.repo'
import {
	CategoryCreateRequest,
	CategoryDeleteRequest,
	CategoryGetAllRequest,
	CategoryGetAllResponse,
	CategoryGetOneByIdRequest,
	CategoryGetOneRequest,
	CategoryGetOneResponse,
	CategoryUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class CategoryService {
	private readonly repo: CategoryRepo
	constructor(repo: CategoryRepo) {
		this.repo = repo
	}

	async getAll(payload: CategoryGetAllRequest): Promise<CategoryGetAllResponse | CategoryGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async getOneById(payload: CategoryGetOneByIdRequest): Promise<CategoryGetOneResponse> {
		const category = await this.repo.getOneById(payload)
		if (!category) {
			throw new BadRequestException('category not found')
		}
		return category
	}

	async getOne(payload: CategoryGetOneRequest): Promise<CategoryGetOneResponse> {
		const category = await this.repo.getOne(payload)

		return category
	}

	async create(paylaod: CategoryCreateRequest): Promise<MutationResponse> {
		const candidate = await this.getOne({ name: paylaod.name })
		if (candidate) {
			return candidate
		}
		return this.repo.create(paylaod)
	}

	async update(param: CategoryGetOneByIdRequest, payload: CategoryUpdateRequest): Promise<MutationResponse> {
		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: CategoryDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}
}
