import { CreateInManyLangs, PaginationRequest, UpdateInManyLangs } from '../../../interfaces'

export declare interface BuildingGetAllRequest extends PaginationRequest {
	name?: string
	address?: string
	description?: string
	phoneNumber?: string
	workStartTime?: string
	workEndTime?: string
}

export declare interface BuildingGetOneByIdRequest {
	id: string
}

export declare interface BuildingGetOneRequest {
	id?: string
	name?: string
	address?: string
	description?: string
	phoneNumber?: string
	workEndTime?: string
	workStartTime?: string
	latutude?: string
	longitude?: string
}

export declare interface BuildingCreateRequest {
	name: CreateInManyLangs
	address: CreateInManyLangs
	description?: UpdateInManyLangs
	latitude: string
	longitude: string
	phoneNumber: string
	workEndTime?: string
	workStartTime?: string
	image?: string
	//=
	images?: Array<Express.Multer.File>
}

export declare interface BuildingUpdateRequest {
	name?: UpdateInManyLangs
	address?: UpdateInManyLangs
	description?: UpdateInManyLangs
	latitude?: string
	longitude?: string
	phoneNumber?: string
	workEndTime?: string
	workStartTime?: string
	image?: string
	//=
	imagesToDelete?: string[]
	images?: Array<Express.Multer.File>
}

export declare interface BuildingDeleteRequest {
	id: string
}
