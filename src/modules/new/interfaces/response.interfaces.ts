import { CreateInManyLangs, PaginationResponse } from '../../../interfaces'

export declare type NewGetAllResponse = PaginationResponse<NewGetOneResponse>

export declare interface NewGetOneResponse {
	id: string
	name: string
	description: string
	authorId: string
	viewsCount: number
	isTop: boolean
	createdAt: Date
}

export declare type NewGetAllForAdminResponse = PaginationResponse<NewGetOneForAdminResponse>

export declare interface NewGetOneForAdminResponse {
	id: string
	name: CreateInManyLangs
	description: CreateInManyLangs
	authorId: string
	viewsCount: number
	isTop: boolean
	createdAt: Date
}
