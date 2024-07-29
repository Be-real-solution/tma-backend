import { BadRequestException, Injectable } from '@nestjs/common'
import { NewRepo } from './new.repo'
import { NewCreateRequest, NewDeleteRequest, NewGetAllRequest, NewGetAllResponse, NewGetOneByIdRequest, NewGetOneRequest, NewGetOneResponse, NewUpdateRequest } from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class NewService {
	private readonly repo: NewRepo
	constructor(repo: NewRepo) {
		this.repo = repo
	}

	async getAll(payload: NewGetAllRequest): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async getOneById(payload: NewGetOneByIdRequest): Promise<NewGetOneResponse> {
		const neww = await this.repo.getOneById(payload)
		if (!neww) {
			throw new BadRequestException('neww not found')
		}
		return neww
	}

	async getOne(payload: NewGetOneRequest): Promise<NewGetOneResponse> {
		const neww = await this.repo.getOne(payload)

		return neww
	}

	async create(payload: NewCreateRequest): Promise<MutationResponse> {
		const candidate = await this.getOne({ name: payload.name })
		if (candidate) {
			throw new BadRequestException(`this name already exists`)
		}
		return this.repo.create(payload)
	}

	async update(param: NewGetOneByIdRequest, payload: NewUpdateRequest): Promise<MutationResponse> {
		if (payload.name) {
			const candidate = await this.getOne({ name: payload.name })
			if (candidate && candidate.id !== param.id) {
				throw new BadRequestException(`this name already exists`)
			}
		}
		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: NewDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}
}
