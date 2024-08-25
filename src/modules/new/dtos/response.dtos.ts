import { ApiProperty } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationResponseDto } from '../../../common'
import { NewGetAllForAdminResponse, NewGetAllResponse, NewGetOneForAdminResponse, NewGetOneResponse } from '../interfaces'
import { CreateInManyLangs } from '../../../interfaces'

export class NewGetOneResponseDto implements NewGetOneResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: String })
	adminId: string

	@ApiProperty({ type: Number })
	viewsCount: number

	@ApiProperty({ type: String })
	description: string

	@ApiProperty({ type: Boolean })
	isTop: boolean

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date

	@ApiProperty({ type: String })
	mainImage: string

	@ApiProperty({ type: String, isArray: true })
	images: string[]
}

export class NewGetAllResponseDto extends PaginationResponseDto implements NewGetAllResponse {
	@ApiProperty({ type: NewGetOneResponseDto, isArray: true })
	data: NewGetOneResponse[]
}

export class NewGetOneForAdminResponseDto implements NewGetOneForAdminResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: CreateInManyLangsDto })
	name: CreateInManyLangs

	@ApiProperty({ type: String })
	adminId: string

	@ApiProperty({ type: Number })
	viewsCount: number

	@ApiProperty({ type: CreateInManyLangsDto })
	description: CreateInManyLangs

	@ApiProperty({ type: Boolean })
	isTop: boolean

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date

	@ApiProperty({ type: String })
	mainImage: string

	@ApiProperty({ type: String, isArray: true })
	images: string[]
}

export class NewGetAllForAdminResponseDto extends PaginationResponseDto implements NewGetAllForAdminResponse {
	@ApiProperty({ type: NewGetOneForAdminResponseDto, isArray: true })
	data: NewGetOneForAdminResponse[]
}
