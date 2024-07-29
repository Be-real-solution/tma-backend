import { PaginationRequestDto } from '../../../common'
import { NewCreateRequest, NewDeleteRequest, NewGetAllRequest, NewGetOneByIdRequest, NewGetOneRequest, NewUpdateRequest } from '../interfaces'

export class NewGetAllRequestDto extends PaginationRequestDto implements NewGetAllRequest {
	name?: string
	authorId?: string
	description?: string
}

export class NewGetOneByIdRequestDto implements NewGetOneByIdRequest {
	id: string
}

export class NewGetOneRequestDto implements NewGetOneRequest {
	id?: string
	name?: string
	authorId?: string
	viewsCount?: number
	description?: string
}

export class NewCreateRequestDto implements NewCreateRequest {
	name: string
	authorId: string
	description: string
}

export class NewUpdateRequestDto implements NewUpdateRequest {
	name?: string
	authorId?: string
	viewsCount?: number
	description?: string
}

export class NewDeleteRequestDto implements NewDeleteRequest {
	id: string
}
