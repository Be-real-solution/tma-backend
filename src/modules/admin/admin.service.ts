import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { AdminRepo } from './admin.repo'
import * as bcrypt from 'bcrypt'
import {
	AdminCreateRequest,
	AdminDeleteRequest,
	AdminGetAllRequest,
	AdminGetAllResponse,
	AdminGetOneByIdRequest,
	AdminGetOneRequest,
	AdminGetOneResponse,
	AdminUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'
import { JwtService } from '@nestjs/jwt'
import { JwtConfig } from '../../configs'

@Injectable()
export class AdminService {
	private readonly repo: AdminRepo
	private readonly jwtService: JwtService
	constructor(repo: AdminRepo, jwtService: JwtService) {
		this.repo = repo
		this.jwtService = jwtService
	}

	async getAll(payload: AdminGetAllRequest): Promise<AdminGetAllResponse | AdminGetOneResponse[]> {
		return this.repo.getAll(payload)
	}

	async getOneById(payload: AdminGetOneByIdRequest): Promise<AdminGetOneResponse> {
		const admin = await this.repo.getOneById(payload)
		if (!admin) {
			throw new BadRequestException('admin not found')
		}
		return admin
	}

	async getOne(payload: AdminGetOneRequest): Promise<AdminGetOneResponse> {
		const admin = await this.repo.getOne(payload)

		return admin
	}

	async create(payload: AdminCreateRequest, authorization: string): Promise<MutationResponse> {
		const admins = await this.getAll({ pagination: false })
		if (Array.isArray(admins)) {
			if (admins.length) {
				if (!authorization) {
					throw new UnauthorizedException('authorization not provided')
				}
				const token = authorization.split(' ')[1] || ''
				if (!token) {
					throw new UnauthorizedException('token not provided')
				}
				try {
					const payload = await this.jwtService.verifyAsync(token, { secret: JwtConfig.accessToken.key })
					if (!payload?.id) {
						throw new UnauthorizedException('invalid token')
					}
				} catch (e) {
					throw new UnauthorizedException(e)
				}
			}
		}
		const candidate = await this.getOne({ username: payload.username })
		if (candidate) {
			throw new BadRequestException('username already exists')
		}
		const password = await bcrypt.hash(payload.password, 7)

		return this.repo.create({ ...payload, password: password })
	}

	async update(param: AdminGetOneByIdRequest, payload: AdminUpdateRequest): Promise<MutationResponse> {
		const ca = await this.getOne(param)
		if (!ca) {
			throw new BadRequestException('admin not found')
		}
		if (payload.username) {
			const candidate = await this.getOne({ username: payload.username })
			if (candidate && candidate.id !== param.id) {
				throw new BadRequestException('username already exists')
			}
		}
		const password = payload.password ? await bcrypt.hash(payload.password, 7) : undefined

		return this.repo.update({ ...param, ...payload, password: password })
	}

	async delete(payload: AdminDeleteRequest): Promise<MutationResponse> {
		const ca = await this.getOne(payload)
		if (!ca) {
			throw new BadRequestException('admin not found')
		}
		return this.repo.delete(payload)
	}
}
