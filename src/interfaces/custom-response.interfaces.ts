export declare interface CResponse<T> {
	data: T
	error?: string
	errorMessage?: string[]
	warning?: string[]
	status: number
}
