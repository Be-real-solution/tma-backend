export declare interface NewImageGetAllRequest {
	newId?: string
}

export declare interface NewImageCreateRequest {
	newId: string
	imageLink: string
}

export declare interface NewImageCreateManyRequest {
	datas: NewImageCreateRequest[]
}

export declare interface NewImageDeleteRequest {
	id: string
}

export declare interface NewImageDeleteManyRequest {
	ids: string[]
}
