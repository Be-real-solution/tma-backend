import { PaginationResponse } from '../../../interfaces'

export declare type AuthorGetAllResponse = PaginationResponse<AuthorGetOneResponse>

export declare interface AuthorGetOneResponse {
	id: string
	fullName: string
	createdAt: Date
}
