import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponseDto } from '../../../common'
import { BuildingGetAllResponse, BuildingGetOneResponse } from '../interfaces'
import { newRandomUUID } from '../../../common/helpers'
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class BuildingGetOneResponseDto implements BuildingGetOneResponse {
	@ApiProperty({ type: String, example: newRandomUUID })
	@IsUUID('4')
	@IsNotEmpty()
	id: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	address: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	imageLink: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	phoneNumber: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	workEndTime: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	workStartTime: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	latitude: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	longitude: string

	@ApiProperty({ type: Date, example: new Date() })
	@IsDateString()
	@IsNotEmpty()
	createdAt: Date
}
export class BuildingGetAllResponseDto extends PaginationResponseDto implements BuildingGetAllResponse {
	@ApiProperty({ type: BuildingGetOneResponseDto, isArray: true })
	data: BuildingGetOneResponse[]
}
