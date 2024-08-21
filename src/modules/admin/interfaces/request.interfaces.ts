import { PaginationRequest } from '../../../interfaces'

export declare interface AdminGetAllRequest extends PaginationRequest {
	fullName?: string
	username?: string
}

export declare interface AdminGetOneByIdRequest {
	id: string
}

export declare interface AdminGetOneRequest {
	id?: string
	fullName?: string
	username?: string
}

export declare interface AdminCreateRequest {
	fullName: string
	username: string
	password: string
}

export declare interface AdminUpdateRequest {
	fullName?: string
	username?: string
	password?: string
}

export declare interface AdminDeleteRequest {
	id: string
}
