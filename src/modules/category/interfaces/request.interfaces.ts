import { CreateInManyLangs, PaginationRequest, UpdateInManyLangs } from '../../../interfaces'

export declare interface CategoryGetAllRequest extends PaginationRequest {
	name?: string
}

export declare interface CategoryGetOneByIdRequest {
	id: string
}

export declare interface CategoryGetOneRequest {
	id?: string
	name?: string
}

export declare interface CategoryCreateRequest {
	name: CreateInManyLangs
}

export declare interface CategoryUpdateRequest {
	name?: UpdateInManyLangs
}

export declare interface CategoryDeleteRequest {
	id: string
}
