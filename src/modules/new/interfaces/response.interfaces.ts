import { CreateInManyLangs, PaginationResponse } from '../../../interfaces'
import { AdminGetOneResponse } from '../../admin/interfaces'
import { CategoryGetOneResponse } from '../../category/interfaces'

export declare interface NewImage {
	id: string
	imageLink: string
	createdAt: Date
}

export declare type NewGetAllResponse = PaginationResponse<NewGetOneResponse>

export declare interface NewGetOneResponse {
	id: string
	name: string
	description: string
	admin: AdminGetOneResponse
	category: CategoryGetOneResponse
	viewsCount: number
	isTop: boolean
	mainImage: string
	images: NewImage[]
	createdAt: Date
}

export declare type NewGetAllForAdminResponse = PaginationResponse<NewGetOneForAdminResponse>

export declare interface NewGetOneForAdminResponse {
	id: string
	name: CreateInManyLangs
	description: CreateInManyLangs
	admin: AdminGetOneResponse
	category: CategoryGetOneResponse
	viewsCount: number
	isTop: boolean
	mainImage: string
	images: NewImage[]
	createdAt: Date
}
