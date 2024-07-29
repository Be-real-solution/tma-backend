import { PaginationRequest } from '../../../interfaces'

export declare interface NewGetAllRequest extends PaginationRequest {
	name?: string
	description?: string
	authorId?: string
}

export declare interface NewGetOneByIdRequest {
	id: string
}

export declare interface NewGetOneRequest {
	id?: string
	name?: string
	description?: string
	authorId?: string
	viewsCount?: number
}

export declare interface NewCreateRequest {
	name: string
	description: string
	authorId: string
}

export declare interface NewUpdateRequest {
	name?: string
	description?: string
	authorId?: string
	viewsCount?: number
}

export declare interface NewDeleteRequest {
	id: string
}
