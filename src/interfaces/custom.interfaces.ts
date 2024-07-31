import { LanguageEnum } from '@prisma/client'

export declare interface CustomResponse {
	[key: string]: string
}

export declare type CreateInManyLangs = {
	// ru: string
	// uz: string
	// en: string
	[key in LanguageEnum]: string
}
