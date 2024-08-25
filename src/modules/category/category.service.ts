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
import { CResponse, MutationResponse } from '../../interfaces'

@Injectable()
export class CategoryService {
	private readonly repo: CategoryRepo
	constructor(repo: CategoryRepo) {
		this.repo = repo
	}

	async getAll(payload: CategoryGetAllRequest): Promise<CResponse<CategoryGetAllResponse | CategoryGetOneResponse[]>> {
		const categories = await this.repo.getAll(payload)
		return { data: categories, status: 200 }
	}

	async getOneById(payload: CategoryGetOneByIdRequest): Promise<CResponse<CategoryGetOneResponse>> {
		const category = await this.repo.getOneById(payload)
		if (!category) {
			throw new BadRequestException('category not found')
		}
		return { data: category, status: 200 }
	}

	async getOne(payload: CategoryGetOneRequest): Promise<CategoryGetOneResponse> {
		const category = await this.repo.getOne(payload)

		return category
	}

	async create(payload: CategoryCreateRequest): Promise<CResponse<MutationResponse>> {
		const candidate = await this.getOne({ name: payload.name })
		if (candidate) {
			throw new BadRequestException('name already exists')
		}
		const category = await this.repo.create(payload)
		return { data: category, status: 200 }
	}

	async update(param: CategoryGetOneByIdRequest, payload: CategoryUpdateRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOne(param)
		if (!ca) {
			throw new BadRequestException('category not found')
		}
		const category = await this.repo.update({ ...param, ...payload })
		return { data: category, status: 200 }
	}

	async delete(payload: CategoryDeleteRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOne(payload)
		if (!ca) {
			throw new BadRequestException('category not found')
		}
		const category = await this.repo.delete(payload)
		return { data: category, status: 200 }
	}
}
