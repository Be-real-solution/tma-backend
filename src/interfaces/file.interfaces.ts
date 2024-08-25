export declare interface UploadedTxtFile {
	buffer: Buffer
	originalname: string
	mimetype: string
	size: number
}

export declare interface CustomUploadedFiles {
	image?: Express.Multer.File[]
	images?: Express.Multer.File[]
}
