import { CustomResponse } from '../../interfaces'
import { TranslationGetOneResponse } from '../../modules/translation/interfaces'

export function TranslationArrayToObject(translations: TranslationGetOneResponse[]): Promise<CustomResponse> {
	const customObj: any = {}
	for (const translation of translations) {
		customObj[`${translation.tableId}=${translation.tableField}`] = translation.text
	}
	console.log(customObj)
	return customObj
}
