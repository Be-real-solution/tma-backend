import { ApiProperty } from '@nestjs/swagger'
import { MutationResponse } from '../../interfaces'
import { newRandomUUID } from '../helpers'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { CResponseDto } from './custom-response.dtos'

export class MutationResponseDto implements MutationResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class MutationResDto extends CResponseDto<MutationResponse> {
	@ApiProperty({ type: MutationResponseDto })
	data: MutationResponse
}
