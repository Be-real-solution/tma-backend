export declare interface PaginationRequest {
	pageNumber?: number
	pageSize?: number
	pagination?: boolean
}

export declare interface PaginationResponse<T> {
	pagesCount: number
	pageSize: number
	data: T[]
}
