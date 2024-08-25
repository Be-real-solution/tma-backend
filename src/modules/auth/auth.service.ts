import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthRepo } from './auth.repo'
import * as bcrypt from 'bcrypt'
import { AdminSignInRequest, AdminSignInResponse, Tokens } from './interfaces'
import { JwtService } from '@nestjs/jwt'
import { JwtConfig } from '../../configs'
import { CResponse } from '../../interfaces'

@Injectable()
export class AuthService {
	private readonly repo: AuthRepo
	private readonly jwtService: JwtService
	constructor(repo: AuthRepo, jwtService: JwtService) {
		this.repo = repo
		this.jwtService = jwtService
	}

	async adminSignIn(payload: AdminSignInRequest): Promise<CResponse<AdminSignInResponse>> {
		const admin = await this.repo.adminGetOne({ username: payload.username })
		if (!admin) {
			throw new UnauthorizedException('admin not found')
		}

		const isCorrect = await bcrypt.compare(payload.password, admin.password)
		if (!isCorrect) {
			throw new UnauthorizedException('admin not found')
		}
		delete admin.password
		const tokens = await this.getTokens({ id: admin.id })
		return { data: { admin: admin, tokens: tokens }, status: 200 }
	}

	private async getTokens(payload: { id: string }): Promise<Tokens> {
		return {
			accessToken: await this.getAccessToken(payload),
			refreshToken: await this.getRefreshToken(payload),
		}
	}

	private async getAccessToken(payload: { id: string }): Promise<string> {
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: JwtConfig.accessToken.key,
			expiresIn: JwtConfig.accessToken.time,
		})

		return accessToken
	}
	private async getRefreshToken(payload: { id: string }): Promise<string> {
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: JwtConfig.refreshToken.key,
			expiresIn: JwtConfig.refreshToken.time,
		})
		return refreshToken
	}
}
