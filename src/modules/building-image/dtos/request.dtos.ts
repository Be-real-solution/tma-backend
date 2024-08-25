import { ApiProperty } from '@nestjs/swagger'
import { BuildingImageCreateRequest, BuildingImageDeleteRequest, BuildingImageGetAllRequest } from '../interfaces'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class BuildingImageGetAllRequestDto implements BuildingImageGetAllRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	buildingId: string
}

export class BuildingImageCreateRequestDto implements BuildingImageCreateRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	buildingId: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	imageLink: string
}

export class BuildingImageDeleteRequestDto implements BuildingImageDeleteRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
