import { CustomResponse, CustomResponse2 } from '../../interfaces'
import { TranslationGetOneResponse } from '../../modules/translation/interfaces'

export function TranslationArrayToObject(translations: TranslationGetOneResponse[]): Promise<CustomResponse> {
	const customObj: any = {}
	for (const translation of translations) {
		customObj[`${translation.tableId}=${translation.tableField}`] = translation.text
	}
	console.log(customObj)
	return customObj
}

export function TranslationArrayToObject2(translations: TranslationGetOneResponse[]): Promise<CustomResponse2> {
	const customObj: any = {}
	for (const translation of translations) {
		const key = `${translation.tableId}=${translation.tableField}`
		if (!customObj[key]) {
			customObj[key] = {}
		}

		customObj[key][translation.language] = translation.text
	}
	console.log(customObj)
	return customObj
}
