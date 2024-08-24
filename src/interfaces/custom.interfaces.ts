export declare interface CustomResponse {
	[key: string]: string
}
export declare interface CustomResponse2 {
	[key: string]: CreateInManyLangs
}

export declare type CreateInManyLangs = {
	ru: string
	uz: string
	en: string
}

export declare type UpdateInManyLangs = {
	ru?: string
	uz?: string
	en?: string
}
