import { BadRequestException, Injectable } from '@nestjs/common'
import { NewRepo } from './new.repo'
import {
	NewCreateRequest,
	NewDeleteRequest,
	NewGetAllForAdminResponse,
	NewGetAllRequest,
	NewGetAllResponse,
	NewGetOneByIdRequest,
	NewGetOneForAdminResponse,
	NewGetOneRequest,
	NewGetOneResponse,
	NewUpdateManyCarousel,
	NewUpdateRequest,
} from './interfaces'
import { CResponse, MutationResponse } from '../../interfaces'
import { NewImageService } from '../new-image'
import { TranslationService } from '../translation'
import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../common'
import { TranslationArrayToObject, TranslationArrayToObject2 } from '../../common/helpers/translation-array-to-object'

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

	async getAll(payload: NewGetAllRequest, lang: LanguageEnum): Promise<CResponse<NewGetAllResponse | NewGetOneResponse[]>> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name ?? '', payload.description ?? ''],
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}

		const news = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, description: undefined })

		const mappedTableIds: string[] = []
		if (Array.isArray(news)) {
			for (const n of news) {
				mappedTableIds.push(n.id, ...n.categories.map((c) => c.id))
			}
		}

		let mappedNews
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription, TranslatedTableFields.categoryName],
			tableIds: mappedTableIds,
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(news)) {
			mappedNews = news.map((n) => {
				return {
					...n,
					name: translatedObject[`${n.id}=${TranslatedTableFields.newName}`] || n.name,
					description: translatedObject[`${n.id}=${TranslatedTableFields.newDescription}`] || n.description,
					categories: n.categories.map((c) => ({
						...c,
						name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`] || c.name,
					})),
				}
			})

			return { data: mappedNews, status: 200 }
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
			data: {
				data: mappedNews,
				pagesCount: news.pagesCount,
				pageSize: news.pageSize,
			},
			status: 200,
		}
	}

	async getAllForAdmin(payload: NewGetAllRequest): Promise<CResponse<NewGetAllForAdminResponse | NewGetOneForAdminResponse[]>> {
		const searchedData = await this.translationService.getAll({
			text: [payload.name ?? '', payload.description ?? ''],
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}

		const news = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, description: undefined })

		const mappedTableIds: string[] = []
		if (Array.isArray(news)) {
			for (const n of news) {
				mappedTableIds.push(n.id, ...n.categories.map((c) => c.id))
			}
		}

		let mappedNews
		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription, TranslatedTableFields.categoryName],
			tableIds: mappedTableIds,
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		if (Array.isArray(news)) {
			mappedNews = news.map((n) => {
				return {
					...n,
					name: translatedObject[`${n.id}=${TranslatedTableFields.newName}`],
					description: translatedObject[`${n.id}=${TranslatedTableFields.newDescription}`],
					categories: n.categories.map((c) => ({
						...c,
						name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`],
					})),
				}
			})

			return { data: mappedNews, status: 200 }
		} else {
			mappedNews = news.data.map((n) => {
				return {
					...n,
					name: translatedObject[`${n.id}=${TranslatedTableFields.newName}`],
					description: translatedObject[`${n.id}=${TranslatedTableFields.newDescription}`],
					categories: n.categories.map((c) => ({
						...c,
						name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`],
					})),
				}
			})
		}
		return {
			data: {
				data: mappedNews,
				pagesCount: news.pagesCount,
				pageSize: news.pageSize,
			},
			status: 200,
		}
	}

	async getOneById(payload: NewGetOneByIdRequest, lang: LanguageEnum): Promise<CResponse<NewGetOneResponse>> {
		const neww = await this.repo.getOneById(payload)
		if (!neww) {
			throw new BadRequestException('new not found')
		}

		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription, TranslatedTableFields.categoryName],
			tableIds: [neww.id, ...neww.categories.map((c) => c.id)],
		})

		const translatedObject = await TranslationArrayToObject(translations)
		await this.update({ id: neww.id }, { viewsCount: neww.viewsCount + 1 })

		return {
			data: {
				...neww,
				name: translatedObject[`${neww.id}=${TranslatedTableFields.newName}`] || neww.name,
				description: translatedObject[`${neww.id}=${TranslatedTableFields.newDescription}`] || neww.description,
				categories: neww.categories.map((c) => ({
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`] || c.name,
				})),
			},
			status: 200,
		}
	}

	async getOneByIdForAdmin(payload: NewGetOneByIdRequest): Promise<CResponse<NewGetOneForAdminResponse>> {
		const neww = await this.repo.getOneById(payload)
		if (!neww) {
			throw new BadRequestException('new not found')
		}

		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription, TranslatedTableFields.categoryName],
			tableIds: [neww.id, ...neww.categories.map((c) => c.id)],
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		return {
			status: 200,
			data: {
				...neww,
				name: translatedObject[`${neww.id}=${TranslatedTableFields.newName}`],
				description: translatedObject[`${neww.id}=${TranslatedTableFields.newDescription}`],
				categories: neww.categories.map((c) => ({
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`],
				})),
			},
		}
	}

	async getOne(payload: NewGetOneRequest): Promise<NewGetOneResponse> {
		const neww = await this.repo.getOne(payload)

		return neww
	}

	async create(payload: NewCreateRequest): Promise<CResponse<MutationResponse>> {
		const existsInTr = await this.translationService.getAll2({
			text: [payload.name.uz, payload.name.ru, payload.name.en],
			tableFields: [TranslatedTableFields.newName],
		})
		if (existsInTr.length) {
			throw new BadRequestException('new name already exists')
		}

		const neww = await this.repo.create(payload)
		payload?.images?.length ? await this.newImageService.createMany({ datas: payload.images.map((i) => ({ newId: neww.id, imageLink: i.filename })) }) : null
		await this.createInManyLang(neww.id, payload, 'create')

		return { data: neww, status: 200 }
	}

	async update(param: NewGetOneByIdRequest, payload: NewUpdateRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOne(param)
		if (!ca) {
			throw new BadRequestException('new not found')
		}
		await this.checkUpdateFields(param, payload)

		const updatedNew = await this.repo.update({ ...param, ...payload })
		payload?.imagesToDelete?.length ? await this.newImageService.deleteMany({ ids: payload.imagesToDelete }) : null
		payload?.images?.length ? await this.newImageService.createMany({ datas: payload.images.map((i) => ({ newId: updatedNew.id, imageLink: i.filename })) }) : null
		await this.createInManyLang(updatedNew.id, payload, 'update')

		return { data: updatedNew, status: 200 }
	}

	async updateManyCarousel(payload: NewUpdateManyCarousel): Promise<CResponse<MutationResponse>> {
		const neww = await this.repo.updateManyCarousel(payload)

		return { data: neww, status: 200 }
	}

	async delete(payload: NewDeleteRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOne(payload)
		if (!ca) {
			throw new BadRequestException('new not found')
		}
		const neww = await this.repo.delete(payload)
		await this.translationService.deleteMany({ tableId: neww.id })

		return { data: neww, status: 200 }
	}

	private async checkUpdateFields(param: NewGetOneByIdRequest, payload: NewUpdateRequest): Promise<void> {
		if (payload.name && Object.values(payload.name).length) {
			const texts = Object.values(payload.name).filter((t) => t !== undefined && t !== null)
			const c1 = await this.translationService.getAll2({
				text: texts,
				tableFields: [TranslatedTableFields.newName],
			})
			c1.forEach((c) => {
				if (c && c.tableId !== param.id && c.tableField === TranslatedTableFields.newName) {
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
			if (payload.name && Object.values(payload.name).length) {
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
			}

			if (payload.description && Object.values(payload.description).length) {
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
}
