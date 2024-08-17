import { PaginationResponse } from '../../../interfaces'

export declare type CarouselGetAllResponse = PaginationResponse<CarouselGetOneResponse>

export declare interface CarouselGetOneResponse {
	id: string
	name: string
	description: string
	imageLink: string
	isActive: boolean
	createdAt: Date
}
