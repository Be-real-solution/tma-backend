import { $Enums, LanguageEnum } from '@prisma/client'
import { TranslationCreateRequest, TranslationDeleteRequest, TranslationGetOneByIdRequest, TranslationUpdateRequest } from '../interfaces'
import { TranslatedTableFields } from '../../../common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class TranslationGetOneByIdRequestDto implements TranslationGetOneByIdRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class TranslationCreateRequestDto implements TranslationCreateRequest {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	text: string

	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	tableId: string

	@ApiProperty({ type: String })
	@IsEnum(LanguageEnum)
	@IsNotEmpty()
	language: $Enums.LanguageEnum

	@ApiProperty({ type: String })
	@IsEnum(TranslatedTableFields)
	@IsNotEmpty()
	tableField: TranslatedTableFields
}

export class TranslationUpdateRequestDto implements TranslationUpdateRequest {
	@ApiPropertyOptional({ type: String })
	@IsEnum(LanguageEnum)
	@IsOptional()
	language?: $Enums.LanguageEnum

	@ApiPropertyOptional({ type: String })
	@IsEnum(TranslatedTableFields)
	@IsOptional()
	tableField?: TranslatedTableFields

	@ApiPropertyOptional({ type: String })
	@IsUUID('4')
	@IsOptional()
	tableId?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	text?: string
}

export class TranslationDeleteRequestDto implements TranslationDeleteRequest {
	@ApiProperty({ type: String })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}
