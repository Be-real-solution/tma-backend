import { LanguageEnum } from '@prisma/client'

export declare interface TranslationGetOneResponse {
	id: string
	text: string
	tableId: string
	tableField: string
	language: LanguageEnum
}
