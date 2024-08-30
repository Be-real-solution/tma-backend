import { CreateInManyLangs, PaginationRequest, UpdateInManyLangs } from '../../../interfaces'

export declare interface NewGetAllRequest extends PaginationRequest {
	name?: string
	description?: string
	categoryIds?: string[]
	adminId?: string
	isTop?: boolean
	startDate?: Date
	endDate?: Date
}

export declare interface NewGetOneByIdRequest {
	id: string
}

export declare interface NewGetOneRequest {
	id?: string
	name?: string
	description?: string
	adminId?: string
	categoryIds?: string[]
	viewsCount?: number
	isTop?: boolean
}

export declare interface NewCreateRequest {
	name: CreateInManyLangs
	description: CreateInManyLangs
	adminId: string
	categoryIds: string[]
	isTop?: boolean
	//=
	image?: string
	images?: Array<Express.Multer.File>
}

export declare interface NewUpdateRequest {
	name?: UpdateInManyLangs
	description?: UpdateInManyLangs
	adminId?: string
	viewsCount?: number
	categoryIds?: string[]
	categoryIdsToDelete?: string[]
	isTop?: boolean
	//=
	image?: string
	images?: Array<Express.Multer.File>
	imagesToDelete?: string[]
}

export declare interface NewUpdateManyCarousel {
	ids: string[]
	isTop: boolean
}

export declare interface NewDeleteRequest {
	id: string
}
