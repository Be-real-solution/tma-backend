import { AdminGetOneResponse } from '../../admin/interfaces'

export declare interface AdminSignInRequest {
	username: string
	password: string
}

export declare interface Tokens {
	accessToken: string
	refreshToken: string
}
export declare interface AdminSignInResponse {
	admin: AdminGetOneResponse
	tokens: Tokens
}
