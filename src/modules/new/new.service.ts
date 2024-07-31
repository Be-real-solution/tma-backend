import { BadRequestException, Injectable } from '@nestjs/common'
import { NewRepo } from './new.repo'
import { NewCreateRequest, NewDeleteRequest, NewGetAllRequest, NewGetAllResponse, NewGetOneByIdRequest, NewGetOneRequest, NewGetOneResponse, NewUpdateRequest } from './interfaces'
import { MutationResponse } from '../../interfaces'
import { NewImageService } from '../new-image'

@Injectable()
export class NewService {
	private readonly repo: NewRepo
	private readonly newImageService: NewImageService
	constructor(repo: NewRepo, newImageService: NewImageService) {
		this.repo = repo
		this.newImageService = newImageService
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
		const neww = await this.repo.create(payload)
		await this.newImageService.createMany({ datas: payload.imageLinks.map((i) => ({ newId: neww.id, imageLink: i.filename })) })
		return neww
	}

	async update(param: NewGetOneByIdRequest, payload: NewUpdateRequest): Promise<MutationResponse> {
		if (payload.name) {
			const candidate = await this.getOne({ name: payload.name })
			if (candidate && candidate.id !== param.id) {
				throw new BadRequestException(`this name already exists`)
			}
		}

		const updatedNew = await this.repo.update({ ...param, ...payload })
		await this.newImageService.deleteMany({ ids: payload.imagesToDelete })
		await this.newImageService.createMany({ datas: payload.imageLinks.map((i) => ({ newId: updatedNew.id, imageLink: i.filename })) })

		return updatedNew
	}

	async delete(payload: NewDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}
}
