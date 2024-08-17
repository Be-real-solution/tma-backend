import { CreateInManyLangs, PaginationRequest, UpdateInManyLangs } from '../../../interfaces'

export declare interface CarouselGetAllRequest extends PaginationRequest {
	name?: string
	description?: string
	isActive?: boolean
}

export declare interface CarouselGetOneByIdRequest {
	id: string
}

export declare interface CarouselGetOneRequest {
	id?: string
	name?: string
	description?: string
	isActive?: boolean
}

export declare interface CarouselCreateRequest {
	name: CreateInManyLangs
	description: CreateInManyLangs
	//=
	imageLink?: string
}

export declare interface CarouselUpdateRequest {
	name?: UpdateInManyLangs
	description?: UpdateInManyLangs
	//=
	imageLink?: string
}

export declare interface CarouselDeleteRequest {
	id: string
}
