import { AdminTypeEnum } from '@prisma/client'
import { PaginationRequest } from '../../../interfaces'

export declare interface AdminGetAllRequest extends PaginationRequest {
	fullName?: string
	username?: string
	type?: AdminTypeEnum
}

export declare interface AdminGetOneByIdRequest {
	id: string
}

export declare interface AdminGetOneRequest {
	id?: string
	fullName?: string
	username?: string
	type?: AdminTypeEnum
}

export declare interface AdminCreateRequest {
	fullName: string
	username: string
	password: string
	type?: AdminTypeEnum
}

export declare interface AdminUpdateRequest {
	fullName?: string
	username?: string
	password?: string
	type?: AdminTypeEnum
}

export declare interface AdminDeleteRequest {
	id: string
}
