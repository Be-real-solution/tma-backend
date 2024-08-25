import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminSignInRequestDto, AdminSignInResDto } from './dtos'
import { AdminSignInResponse } from './interfaces'
import { CResponse } from '../../interfaces'

@Controller()
export class AuthController {
	private readonly service: AuthService
	constructor(service: AuthService) {
		this.service = service
	}

	@ApiTags('admin')
	@HttpCode(HttpStatus.OK)
	@Post('admin/sign-in')
	@ApiResponse({ type: AdminSignInResDto })
	create(@Body() payload: AdminSignInRequestDto): Promise<CResponse<AdminSignInResponse>> {
		return this.service.adminSignIn(payload)
	}
}
