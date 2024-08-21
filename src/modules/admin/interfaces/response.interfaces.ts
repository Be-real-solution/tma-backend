import { PaginationResponse } from '../../../interfaces'

export declare type AdminGetAllResponse = PaginationResponse<AdminGetOneResponse>

export declare interface AdminGetOneResponse {
	id: string
	fullName: string
	username: string
	createdAt: Date
}
