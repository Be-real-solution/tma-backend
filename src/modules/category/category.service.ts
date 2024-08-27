import { BadRequestException, Injectable } from '@nestjs/common'
import { CategoryRepo } from './category.repo'
import {
	CategoryCreateRequest,
	CategoryDeleteRequest,
	CategoryGetAllForAdminResponse,
	CategoryGetAllRequest,
	CategoryGetAllResponse,
	CategoryGetOneByIdRequest,
	CategoryGetOneForAdminResponse,
	CategoryGetOneRequest,
	CategoryGetOneResponse,
	CategoryUpdateRequest,
} from './interfaces'
import { CResponse, MutationResponse } from '../../interfaces'
import { TranslationService } from '../translation'
import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../common'
import { TranslationArrayToObject, TranslationArrayToObject2 } from '../../common/helpers'

@Injectable()
export class CategoryService {
	private readonly repo: CategoryRepo
	private readonly translationService: TranslationService

	constructor(repo: CategoryRepo, translationService: TranslationService) {
		this.repo = repo
		this.translationService = translationService
	}

	async getAll(payload: CategoryGetAllRequest, lang: LanguageEnum): Promise<CResponse<CategoryGetAllResponse | CategoryGetOneResponse[]>> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name ?? '', payload.name ?? ''],
			tableFields: [TranslatedTableFields.categoryName],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}
		const categories = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined })

		let mappedCategories
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.categoryName],
			tableIds: Array.isArray(categories) ? categories.map((c) => c.id) : categories.data.map((c) => c.id),
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(categories)) {
			mappedCategories = categories.map((c) => {
				return {
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`] || c.name,
				}
			})

			return { data: mappedCategories, status: 200 }
		} else {
			mappedCategories = categories.data.map((c) => {
				return {
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`] || c.name,
				}
			})
		}
		return {
			status: 200,
			data: {
				data: mappedCategories,
				pagesCount: categories.pagesCount,
				pageSize: categories.pageSize,
			},
		}
	}

	async getAllHaveNews(payload: CategoryGetAllRequest, lang: LanguageEnum): Promise<CResponse<CategoryGetAllResponse | CategoryGetOneResponse[]>> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name ?? '', payload.name ?? ''],
			tableFields: [TranslatedTableFields.categoryName],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}
		const categories = await this.repo.getAllHaveNews({ ...payload, ids: tableIds, name: undefined })

		let mappedCategories
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.categoryName],
			tableIds: Array.isArray(categories) ? categories.map((c) => c.id) : categories.data.map((c) => c.id),
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(categories)) {
			mappedCategories = categories.map((c) => {
				return {
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`] || c.name,
				}
			})

			return { data: mappedCategories, status: 200 }
		} else {
			mappedCategories = categories.data.map((c) => {
				return {
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`] || c.name,
				}
			})
		}
		return {
			status: 200,
			data: {
				data: mappedCategories,
				pagesCount: categories.pagesCount,
				pageSize: categories.pageSize,
			},
		}
	}

	async getAllForAdmin(payload: CategoryGetAllRequest): Promise<CResponse<CategoryGetAllForAdminResponse | CategoryGetOneForAdminResponse[]>> {
		const searchedData = await this.translationService.getAll({
			text: [payload.name ?? '', payload.name ?? ''],
			tableFields: [TranslatedTableFields.categoryName],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}
		const categories = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined })

		let mappedCategories
		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.categoryName],
			tableIds: Array.isArray(categories) ? categories.map((c) => c.id) : categories.data.map((c) => c.id),
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		if (Array.isArray(categories)) {
			mappedCategories = categories.map((c) => {
				return {
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`],
				}
			})

			return { data: mappedCategories, status: 200 }
		} else {
			mappedCategories = categories.data.map((c) => {
				return {
					...c,
					name: translatedObject[`${c.id}=${TranslatedTableFields.categoryName}`],
				}
			})
		}
		return {
			status: 200,
			data: {
				data: mappedCategories,
				pagesCount: categories.pagesCount,
				pageSize: categories.pageSize,
			},
		}
	}

	async getOneById(payload: CategoryGetOneByIdRequest, lang: LanguageEnum): Promise<CResponse<CategoryGetOneResponse>> {
		const category = await this.repo.getOneById(payload)
		if (!category) {
			throw new BadRequestException('category not found')
		}
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.categoryName],
			tableIds: [category.id],
		})

		const translatedObject = await TranslationArrayToObject(translations)

		return {
			status: 200,
			data: {
				...category,
				name: translatedObject[`${category.id}=${TranslatedTableFields.categoryName}`] || category.name,
			},
		}
	}

	async getOneByIdForAdmin(payload: CategoryGetOneByIdRequest): Promise<CResponse<CategoryGetOneForAdminResponse>> {
		const category = await this.repo.getOneById(payload)
		if (!category) {
			throw new BadRequestException('category not found')
		}
		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.categoryName],
			tableIds: [category.id],
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		return {
			status: 200,
			data: {
				...category,
				name: translatedObject[`${category.id}=${TranslatedTableFields.categoryName}`],
			},
		}
	}

	async getOne(payload: CategoryGetOneRequest): Promise<CategoryGetOneResponse> {
		const category = await this.repo.getOne(payload)

		return category
	}

	async create(payload: CategoryCreateRequest): Promise<CResponse<MutationResponse>> {
		const existsInTr = await this.translationService.getAll2({ text: [payload.name.uz, payload.name.ru, payload.name.en], tableFields: [TranslatedTableFields.categoryName] })
		if (existsInTr.length) {
			throw new BadRequestException('category name already exists')
		}

		const category = await this.repo.create(payload)
		await this.createInManyLang(category.id, payload, 'create')

		return { data: category, status: 200 }
	}

	async update(param: CategoryGetOneByIdRequest, payload: CategoryUpdateRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOneByIdForAdmin(param)
		if (!ca) {
			throw new BadRequestException('category not found')
		}
		await this.checkUpdateFields(param, payload)
		const category = await this.repo.update({ ...param, ...payload })
		await this.createInManyLang(category.id, payload, 'update')

		return { data: category, status: 200 }
	}

	async delete(payload: CategoryDeleteRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOneByIdForAdmin(payload)
		if (!ca) {
			throw new BadRequestException('category not found')
		}
		const category = await this.repo.delete(payload)
		await this.translationService.deleteMany({ tableId: category.id })

		return { data: category, status: 200 }
	}

	private async checkUpdateFields(param: CategoryGetOneByIdRequest, payload: CategoryUpdateRequest): Promise<void> {
		if (payload.name && Object.values(payload.name).length) {
			const texts = Object.values(payload.name).filter((t) => t !== undefined && t !== null)
			const c1 = await this.translationService.getAll2({
				text: texts,
				tableFields: [TranslatedTableFields.categoryName],
			})
			c1.forEach((c) => {
				if (c && c.tableId !== param.id && c.tableField === TranslatedTableFields.categoryName) {
					throw new BadRequestException('this name already exists')
				}
			})
		}
	}

	private async createInManyLang(id: string, payload: CategoryUpdateRequest, functionality: string): Promise<void> {
		if (functionality === 'create') {
			await this.translationService.createMany({
				datas: [
					...Object.keys(payload.name).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.categoryName,
						tableId: id,
						text: payload.name[k],
					})),
				],
			})
		} else {
			if (payload.name && Object.values(payload.name).length) {
				for (const k of Object.keys(payload.name)) {
					const exists = await this.translationService.getAll({
						language: k as LanguageEnum,
						tableFields: [TranslatedTableFields.categoryName],
						tableIds: [id],
					})

					if (exists.length) {
						await this.translationService.update({ id: exists[0].id }, { text: payload.name[k as LanguageEnum] })
					} else {
						await this.translationService.create({
							language: k as LanguageEnum,
							tableField: TranslatedTableFields.categoryName,
							tableId: id,
							text: payload.name[k as LanguageEnum],
						})
					}
				}
			}
		}
	}
}
