import { ApiProperty } from '@nestjs/swagger'
import { CResponseDto, PaginationResponseDto } from '../../../common'
import { AdminGetAllResponse, AdminGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'

export class AdminGetOneResponseDto implements AdminGetOneResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	id: string

	@ApiProperty({ type: String })
	fullName: string

	@ApiProperty({ type: String })
	username: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}

export class AdminGetAllResponseDto extends PaginationResponseDto implements AdminGetAllResponse {
	@ApiProperty({ type: AdminGetOneResponseDto, isArray: true })
	data: AdminGetOneResponse[]
}

export class AdminGetOneResDto extends CResponseDto<AdminGetOneResponse> {
	@ApiProperty({ type: AdminGetOneResponseDto })
	data: AdminGetOneResponse
}

export class AdminGetAllResDto extends CResponseDto<AdminGetAllResponse> {
	@ApiProperty({ type: AdminGetAllResponseDto })
	data: AdminGetAllResponse
}
