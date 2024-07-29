import { PaginationResponseDto } from '../../../common'
import { NewGetAllResponse, NewGetOneResponse } from '../interfaces'

export class NewGetAllResponseDto extends PaginationResponseDto implements NewGetAllResponse {
	data: NewGetOneResponse[]
}

export class NewGetOneResponseDto implements NewGetOneResponse {
	id: string
	name: string
	authorId: string
	viewsCount: number
	description: string
	createdAt: Date
}
