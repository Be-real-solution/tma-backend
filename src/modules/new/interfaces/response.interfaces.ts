import { CreateInManyLangs, PaginationResponse } from '../../../interfaces'

export declare type NewGetAllResponse = PaginationResponse<NewGetOneResponse>

export declare interface NewGetOneResponse {
	id: string
	name: string
	description: string
	adminId: string
	viewsCount: number
	isTop: boolean
	mainImage: string
	images: string[]
	createdAt: Date
}

export declare type NewGetAllForAdminResponse = PaginationResponse<NewGetOneForAdminResponse>

export declare interface NewGetOneForAdminResponse {
	id: string
	name: CreateInManyLangs
	description: CreateInManyLangs
	adminId: string
	viewsCount: number
	isTop: boolean
	mainImage: string
	images: string[]
	createdAt: Date
}
