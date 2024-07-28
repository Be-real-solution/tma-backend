import { PaginationRequestDto } from '../../../common'
import { AuthorCreateRequest, AuthorDeleteRequest, AuthorGetAllRequest, AuthorGetOneByIdRequest, AuthorUpdateRequest } from '../interfaces'

export class AuthorGetAllRequestDto extends PaginationRequestDto implements AuthorGetAllRequest {
	fullName?: string
}

export class AuthorGetOneByIdRequestDto implements AuthorGetOneByIdRequest {
	id: string
}

export class AuthorCreateRequestDto implements AuthorCreateRequest {
	fullName: string
}

export class AuthorUpdateRequestDto implements AuthorUpdateRequest {
	fullName?: string
}

export class AuthorDeleteRequestDto implements AuthorDeleteRequest {
	id: string
}
