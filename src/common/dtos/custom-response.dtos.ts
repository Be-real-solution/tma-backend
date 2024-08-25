import { ApiPropertyOptional } from '@nestjs/swagger'
import { CResponse } from '../../interfaces'

export class CResponseDto<T> implements Omit<CResponse<T>, 'data'> {
	@ApiPropertyOptional({ type: String })
	error?: string

	@ApiPropertyOptional({ type: Number })
	status: number

	@ApiPropertyOptional({ type: String, isArray: true })
	errorMessage?: string[]

	@ApiPropertyOptional({ type: String, isArray: true })
	warning?: string[]
}
