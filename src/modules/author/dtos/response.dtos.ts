import { PaginationResponseDto } from '../../../common'
import { AuthorGetAllResponse, AuthorGetOneResponse } from '../interfaces'

export class AuthorGetAllResponseDto extends PaginationResponseDto implements AuthorGetAllResponse {
	data: AuthorGetOneResponse[]
}

export class AuthorGetOneResponseDto implements AuthorGetOneResponse {
	id: string
	fullName: string
	createdAt: Date
}
