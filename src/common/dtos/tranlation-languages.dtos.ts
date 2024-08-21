import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CreateInManyLangs, UpdateInManyLangs } from '../../interfaces'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { LanguageEnum } from '@prisma/client'

export class CreateInManyLangsDto implements CreateInManyLangs {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	en: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	ru: string

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	uz: string
}

export class UpdateInManyLangsDto implements UpdateInManyLangs {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	en?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	ru?: string

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	uz?: string
}

export class LanguageDto {
	@ApiProperty({
		type: String,
		examples: {
			uz: { value: 'uz' },
			ru: { value: 'ru' },
			en: { value: 'en' },
		},
	})
	@IsEnum(LanguageEnum)
	@IsNotEmpty()
	['accept-language']: LanguageEnum
}
