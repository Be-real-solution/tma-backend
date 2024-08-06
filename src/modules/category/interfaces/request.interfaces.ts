import { PaginationRequest } from '../../../interfaces'

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
	name: string
}

export declare interface CategoryUpdateRequest {
	name?: string
}

export declare interface CategoryDeleteRequest {
	id: string
}
