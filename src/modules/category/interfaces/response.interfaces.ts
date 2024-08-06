import { PaginationResponse } from '../../../interfaces'

export declare type CategoryGetAllResponse = PaginationResponse<CategoryGetOneResponse>

export declare interface CategoryGetOneResponse {
	id: string
	name: string
	createdAt: Date
}
