export declare interface BuildingImageGetAllRequest {
	buildingId?: string
}

export declare interface BuildingImageCreateRequest {
	buildingId: string
	imageLink: string
}

export declare interface BuildingImageCreateManyRequest {
	datas: BuildingImageCreateRequest[]
}

export declare interface BuildingImageDeleteRequest {
	id: string
}

export declare interface BuildingImageDeleteManyRequest {
	ids: string[]
}
