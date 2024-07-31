import { CreateInManyLangs, PaginationRequest } from '../../../interfaces'

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
	name: CreateInManyLangs
	description: CreateInManyLangs
	authorId: string
	//=
	imageLinks?: Array<Express.Multer.File>
}

export declare interface NewUpdateRequest {
	name?: string
	description?: string
	authorId?: string
	viewsCount?: number
	//=
	imageLinks?: Array<Express.Multer.File>
	imagesToDelete?: string[]
}

export declare interface NewDeleteRequest {
	id: string
}
