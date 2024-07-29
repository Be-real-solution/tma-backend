import { NewImageGetOneResponse } from '../interfaces'

export class NewImageGetOneResponseDto implements NewImageGetOneResponse {
	id: string
	newId: string
	imageLink: string
	createdAt: Date
}
