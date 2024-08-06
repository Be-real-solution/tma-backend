import { CreateInManyLangs, PaginationRequest, UpdateInManyLangs } from '../../../interfaces'

export declare interface NewGetAllRequest extends PaginationRequest {
	name?: string
	description?: string
	categoryId?: string
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
	categoryId?: string
	viewsCount?: number
}

export declare interface NewCreateRequest {
	name: CreateInManyLangs
	description: CreateInManyLangs
	authorId: string
	categoryId: string
	//=
	imageLinks?: Array<Express.Multer.File>
}

export declare interface NewUpdateRequest {
	name?: UpdateInManyLangs
	description?: UpdateInManyLangs
	authorId?: string
	viewsCount?: number
	categoryId?: string
	//=
	imageLinks?: Array<Express.Multer.File>
	imagesToDelete?: string[]
}

export declare interface NewDeleteRequest {
	id: string
}
