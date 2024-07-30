import { $Enums } from '@prisma/client'
import { TranslationCreateRequest, TranslationDeleteRequest, TranslationGetOneByIdRequest, TranslationUpdateRequest } from '../interfaces'
import { TranslatedTableFields } from '../../../common'

export class TranslationGetOneByIdRequestDto implements TranslationGetOneByIdRequest {
	id: string
}

export class TranslationCreateRequestDto implements TranslationCreateRequest {
	text: string
	tableId: string
	language: $Enums.LanguageEnum
	tableField: TranslatedTableFields
}

export class TranslationUpdateRequestDto implements TranslationUpdateRequest {
	language?: $Enums.LanguageEnum
	tableField?: TranslatedTableFields
	tableId?: string
	text?: string
}

export class TranslationDeleteRequestDto implements TranslationDeleteRequest {
	id: string
}
