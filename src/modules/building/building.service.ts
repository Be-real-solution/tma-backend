import { BadRequestException, Injectable } from '@nestjs/common'
import { BuildingRepo } from './building.repo'
import {
	BuildingCreateRequest,
	BuildingDeleteRequest,
	BuildingGetAllRequest,
	BuildingGetAllResponse,
	BuildingGetOneByIdRequest,
	BuildingGetOneRequest,
	BuildingGetOneResponse,
	BuildingUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'

@Injectable()
export class BuildingService {
	private readonly repo: BuildingRepo
	constructor(repo: BuildingRepo) {
		this.repo = repo
	}

	async getAll(payload: BuildingGetAllRequest): Promise<BuildingGetAllResponse | BuildingGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async getOneById(payload: BuildingGetOneByIdRequest): Promise<BuildingGetOneResponse> {
		const building = await this.repo.getOneById(payload)
		if (!building) {
			throw new BadRequestException('building not found')
		}
		return building
	}

	async getOne(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.repo.getOne(payload)

		return building
	}

	async getOneWithOr(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.repo.getOneWithOr(payload)

		return building
	}

	async create(payload: BuildingCreateRequest): Promise<MutationResponse> {
		const candidate = await this.getOneWithOr({ name: payload.name, address: payload.address, phoneNumber: payload.phoneNumber })
		if (candidate) {
			throw new BadRequestException(`this ${candidate.name === payload.name ? 'name' : candidate.address === payload.address ? 'address' : 'phone number'} already exists`)
		}
		return this.repo.create(payload)
	}

	async update(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<MutationResponse> {
		await this.checkUpdateFields(param, payload)

		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: BuildingDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}

	private async checkUpdateFields(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<void> {
		if (payload.name) {
			const c1 = await this.repo.getOne({ name: payload.name })
			if (c1 && c1.id !== param.id) {
				throw new BadRequestException('this name already exists')
			}
		}

		if (payload.address) {
			const c2 = await this.repo.getOne({ address: payload.address })
			if (c2 && c2.id !== param.id) {
				throw new BadRequestException('this address already exists')
			}
		}

		if (payload.phoneNumber) {
			const c3 = await this.repo.getOne({ phoneNumber: payload.phoneNumber })
			if (c3 && c3.id !== param.id) {
				throw new BadRequestException('this phone number already exists')
			}
		}
	}
}
