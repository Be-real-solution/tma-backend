import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiResponse } from '@nestjs/swagger'
import { AdminSignInRequestDto, AdminSignInResponseDto } from './dtos'
import { AdminSignInResponse } from './interfaces'

@Controller()
export class AuthController {
	private readonly service: AuthService
	constructor(service: AuthService) {
		this.service = service
	}

	@Post('admin/sign-in')
	@ApiResponse({ type: AdminSignInResponseDto })
	create(@Body() payload: AdminSignInRequestDto): Promise<AdminSignInResponse> {
		return this.service.adminSignIn(payload)
	}
}
