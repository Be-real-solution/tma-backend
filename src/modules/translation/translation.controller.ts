import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { TranslationService } from './translation.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TranslationCreateRequestDto, TranslationDeleteRequestDto, TranslationGetOneByIdRequestDto, TranslationUpdateRequestDto } from './dtos'
import { AuthGuard, MutationResponseDto } from '../../common'
import { MutationResponse } from '../../interfaces'

@ApiTags('translation')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('translation')
export class TranslationController {
	private readonly service: TranslationService
	constructor(service: TranslationService) {
		this.service = service
	}

	@Post()
	@ApiResponse({ type: MutationResponseDto })
	create(@Body() payload: TranslationCreateRequestDto): Promise<MutationResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: MutationResponseDto })
	update(@Param() param: TranslationGetOneByIdRequestDto, @Body() payload: TranslationUpdateRequestDto): Promise<MutationResponse> {
		return this.service.update(param, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: MutationResponseDto })
	delete(@Param() param: TranslationDeleteRequestDto): Promise<MutationResponse> {
		return this.service.delete(param)
	}
}
