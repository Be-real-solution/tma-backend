import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../../common'

export declare interface TranslationGetAllRequest {
	language?: LanguageEnum
	tableIds?: string[]
	tableFields?: string[]
	text?: string
}
export declare interface TranslationGetOneByIdRequest {
	id: string
}

export declare interface TranslationCreateRequest {
	text: string
	language: LanguageEnum
	tableField: TranslatedTableFields
	tableId: string
}

export declare interface TranslationCreateManyRequest {
	datas: TranslationCreateRequest[]
}

export declare interface TranslationUpdateRequest {
	text?: string
	language?: LanguageEnum
	tableField?: TranslatedTableFields
	tableId?: string
}

export declare interface TranslationDeleteRequest {
	id: string
}
