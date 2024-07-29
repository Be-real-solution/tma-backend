import { PaginationResponse } from '../../../interfaces'

export declare type NewGetAllResponse = PaginationResponse<NewGetOneResponse>

export declare interface NewGetOneResponse {
	id: string
	name: string
	description: string
	authorId: string
	viewsCount: number
	createdAt: Date
}
