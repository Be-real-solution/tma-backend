import { PaginationRequestDto } from '../../../common'
import { CreateInManyLangs, UpdateInManyLangs } from '../../../interfaces'
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
	name: CreateInManyLangs
	authorId: string
	description: CreateInManyLangs
}

export class NewUpdateRequestDto implements NewUpdateRequest {
	name?: UpdateInManyLangs
	description?: UpdateInManyLangs
	authorId?: string
	viewsCount?: number
	imagesToDelete?: string[]
}

export class NewDeleteRequestDto implements NewDeleteRequest {
	id: string
}
