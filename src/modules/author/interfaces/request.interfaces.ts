import { PaginationRequest } from '../../../interfaces'

export declare interface AuthorGetAllRequest extends PaginationRequest {
	fullName?: string
}

export declare interface AuthorGetOneByIdRequest {
	id: string
}

export declare interface AuthorGetOneRequest {
	id?: string
	fullName?: string
}

export declare interface AuthorCreateRequest {
	fullName: string
}

export declare interface AuthorUpdateRequest {
	fullName?: string
}

export declare interface AuthorDeleteRequest {
	id: string
}
