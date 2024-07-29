import { NewImageCreateRequest, NewImageDeleteRequest, NewImageGetAllRequest } from '../interfaces'

export class NewImageGetAllRequestDto implements NewImageGetAllRequest {
	newId: string
}

export class NewImageCreateRequestDto implements NewImageCreateRequest {
	newId: string
	imageLink: string
}

export class NewImageDeleteRequestDto implements NewImageDeleteRequest {
	id: string
}
