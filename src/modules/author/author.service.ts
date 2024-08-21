import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthorRepo } from './author.repo'
import {
	AuthorCreateRequest,
	AuthorDeleteRequest,
	AuthorGetAllRequest,
	AuthorGetAllResponse,
	AuthorGetOneByIdRequest,
	AuthorGetOneRequest,
	AuthorGetOneResponse,
	AuthorUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class AuthorService {
	private readonly repo: AuthorRepo
	constructor(repo: AuthorRepo) {
		this.repo = repo
	}

	async getAll(payload: AuthorGetAllRequest): Promise<AuthorGetAllResponse | AuthorGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async getOneById(payload: AuthorGetOneByIdRequest): Promise<AuthorGetOneResponse> {
		const author = await this.repo.getOneById(payload)
		if (!author) {
			throw new BadRequestException('author not found')
		}
		return author
	}

	async getOne(payload: AuthorGetOneRequest): Promise<AuthorGetOneResponse> {
		const author = await this.repo.getOne(payload)

		return author
	}

	async create(payload: AuthorCreateRequest): Promise<MutationResponse> {
		const candidate = await this.getOne({ fullName: payload.fullName })
		if (candidate) {
			return candidate
		}
		return this.repo.create(payload)
	}

	async update(param: AuthorGetOneByIdRequest, payload: AuthorUpdateRequest): Promise<MutationResponse> {
		const ca = await this.getOne(param)
		if (!ca) {
			throw new BadRequestException('author not found')
		}
		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: AuthorDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}
}
