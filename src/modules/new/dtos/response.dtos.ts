import { ApiProperty } from '@nestjs/swagger'
import { CreateInManyLangsDto, PaginationResponseDto } from '../../../common'
import { NewGetAllForAdminResponse, NewGetAllResponse, NewGetOneForAdminResponse, NewGetOneResponse, NewImage } from '../interfaces'
import { CreateInManyLangs } from '../../../interfaces'
import { AdminGetOneResponse } from '../../admin/interfaces'
import { AdminGetOneResponseDto } from '../../admin/dtos'
import { CategoryGetOneResponseDto } from '../../category/dtos'
import { CategoryGetOneResponse } from '../../category/interfaces'
import { newRandomUUID } from '../../../common/helpers'

export class NewImageDto implements NewImage {
	@ApiProperty({ type: String, example: newRandomUUID() })
	id: string

	@ApiProperty({ type: String })
	imageLink: string

	@ApiProperty({ type: Date, example: new Date() })
	createdAt: Date
}

export class NewGetOneResponseDto implements NewGetOneResponse {
	@ApiProperty({ type: String })
	id: string

	@ApiProperty({ type: String })
	name: string

	@ApiProperty({ type: AdminGetOneResponseDto })
	admin: AdminGetOneResponse

	@ApiProperty({ type: CategoryGetOneResponseDto })
	category: CategoryGetOneResponse

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

	@ApiProperty({ type: NewImageDto, isArray: true })
	images: NewImage[]
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

	@ApiProperty({ type: AdminGetOneResponseDto })
	admin: AdminGetOneResponse

	@ApiProperty({ type: CategoryGetOneResponseDto })
	category: CategoryGetOneResponse

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

	@ApiProperty({ type: NewImageDto, isArray: true })
	images: NewImage[]
}

export class NewGetAllForAdminResponseDto extends PaginationResponseDto implements NewGetAllForAdminResponse {
	@ApiProperty({ type: NewGetOneForAdminResponseDto, isArray: true })
	data: NewGetOneForAdminResponse[]
}
