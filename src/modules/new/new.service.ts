import { BadRequestException, Injectable } from '@nestjs/common'
import { NewRepo } from './new.repo'
import { NewCreateRequest, NewDeleteRequest, NewGetAllRequest, NewGetAllResponse, NewGetOneByIdRequest, NewGetOneRequest, NewGetOneResponse, NewUpdateRequest } from './interfaces'
import { MutationResponse } from '../../interfaces'
import { NewImageService } from '../new-image'
import { TranslationService } from '../translation'
import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../common'
import { TranslationArrayToObject } from '../../common/helpers/translation-array-to-object'

@Injectable()
export class NewService {
	private readonly repo: NewRepo
	private readonly newImageService: NewImageService
	private readonly translationService: TranslationService
	constructor(repo: NewRepo, newImageService: NewImageService, translationService: TranslationService) {
		this.repo = repo
		this.newImageService = newImageService
		this.translationService = translationService
	}

	async getAll(payload: NewGetAllRequest, lang: LanguageEnum): Promise<NewGetAllResponse | NewGetOneResponse[]> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name, payload.description],
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.id)) {
				tableIds.push(tr.id)
			}
		}

		const news = await this.repo.getAll({ ...payload, ids: tableIds })

		let mappedNews
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
			tableIds: Array.isArray(news) ? news.map((n) => n.id) : news.data.map((n) => n.id),
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(news)) {
			mappedNews = news.map((n) => {
				return {
					...n,
					name: translatedObject[`${n.id}=${TranslatedTableFields.newName}`] || n.name,
					description: translatedObject[`${n.id}=${TranslatedTableFields.newDescription}`] || n.description,
				}
			})

			return mappedNews
		} else {
			mappedNews = news.data.map((n) => {
				return {
					...n,
					name: translatedObject[`${n.id}=${TranslatedTableFields.newName}`] || n.name,
					description: translatedObject[`${n.id}=${TranslatedTableFields.newDescription}`] || n.description,
				}
			})
		}
		return {
			data: mappedNews,
			pagesCount: news.pagesCount,
			pageSize: news.pageSize,
		}
	}

	async getOneById(payload: NewGetOneByIdRequest, lang: LanguageEnum): Promise<NewGetOneResponse> {
		const neww = await this.repo.getOneById(payload)
		if (!neww) {
			throw new BadRequestException('neww not found')
		}

		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
			tableIds: [neww.id],
		})

		const translatedObject = await TranslationArrayToObject(translations)

		return {
			...neww,
			name: translatedObject[`${neww.id}=${TranslatedTableFields.newName}`] || neww.name,
			description: translatedObject[`${neww.id}=${TranslatedTableFields.newDescription}`] || neww.description,
		}
	}

	async getOne(payload: NewGetOneRequest): Promise<NewGetOneResponse> {
		const neww = await this.repo.getOne(payload)

		return neww
	}

	async create(payload: NewCreateRequest): Promise<MutationResponse> {
		const existsInTr = await this.translationService.getAll2({ text: [payload.name.uz, payload.name.ru, payload.name.en], tableFields: [TranslatedTableFields.newName] })
		if (existsInTr.length) {
			throw new BadRequestException('new name already exists')
		}

		const neww = await this.repo.create(payload)
		await this.newImageService.createMany({ datas: payload.imageLinks.map((i) => ({ newId: neww.id, imageLink: i.filename })) })
		await this.createInManyLang(neww.id, payload, 'create')

		return neww
	}

	async update(param: NewGetOneByIdRequest, payload: NewUpdateRequest): Promise<MutationResponse> {
		await this.checkUpdateFields(param, payload)

		const updatedNew = await this.repo.update({ ...param, ...payload })
		await this.newImageService.deleteMany({ ids: payload.imagesToDelete })
		await this.newImageService.createMany({ datas: payload.imageLinks.map((i) => ({ newId: updatedNew.id, imageLink: i.filename })) })
		await this.createInManyLang(updatedNew.id, payload, 'update')

		return updatedNew
	}

	async delete(payload: NewDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}

	private async checkUpdateFields(param: NewGetOneByIdRequest, payload: NewUpdateRequest): Promise<void> {
		if (Object.values(payload.name).length) {
			const c1 = await this.translationService.getAll2({ text: Object.values(payload.name), tableFields: [TranslatedTableFields.newName] })
			c1.forEach((c) => {
				if (c && c.id !== param.id) {
					throw new BadRequestException('this name already exists')
				}
			})
		}
	}

	private async createInManyLang(id: string, payload: NewUpdateRequest, functionality: string): Promise<void> {
		if (functionality === 'create') {
			await this.translationService.createMany({
				datas: [
					...Object.keys(payload.name).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.newName,
						tableId: id,
						text: payload.name[k],
					})),
					...Object.keys(payload.description).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.newDescription,
						tableId: id,
						text: payload.description[k],
					})),
				],
			})
		} else {
			for (const k of Object.keys(payload.name)) {
				const exists = await this.translationService.getAll({
					language: k as LanguageEnum,
					tableFields: [TranslatedTableFields.newName],
					tableIds: [id],
				})

				if (exists.length) {
					await this.translationService.update({ id: exists[0].id }, { text: payload.name[k as LanguageEnum] })
				} else {
					await this.translationService.create({
						language: k as LanguageEnum,
						tableField: TranslatedTableFields.newName,
						tableId: id,
						text: payload.name[k as LanguageEnum],
					})
				}
			}

			for (const k of Object.keys(payload.description)) {
				const exists = await this.translationService.getAll({
					language: k as LanguageEnum,
					tableFields: [TranslatedTableFields.newDescription],
					tableIds: [id],
				})

				if (exists.length) {
					await this.translationService.update({ id: exists[0].id }, { text: payload.description[k as LanguageEnum] })
				} else {
					await this.translationService.create({
						language: k as LanguageEnum,
						tableField: TranslatedTableFields.newDescription,
						tableId: id,
						text: payload.description[k as LanguageEnum],
					})
				}
			}
		}
	}
}
