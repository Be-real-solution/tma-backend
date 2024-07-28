import { ApiProperty } from '@nestjs/swagger'
import { PaginationRequest } from '../../interfaces'

export class PaginationRequestDto implements PaginationRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
}

export class PaginationResponseDto {
	@ApiProperty({ example: 10 })
	pagesCount: number

	@ApiProperty({ example: 10 })
	pageSize: number
}
