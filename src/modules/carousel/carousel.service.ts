import { BadRequestException, Injectable } from '@nestjs/common'
import { CarouselRepo } from './carousel.repo'
import {
	CarouselCreateRequest,
	CarouselDeleteRequest,
	CarouselGetAllRequest,
	CarouselGetAllResponse,
	CarouselGetOneByIdRequest,
	CarouselGetOneRequest,
	CarouselGetOneResponse,
	CarouselUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'
import { TranslationService } from '../translation'
import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../common'
import { TranslationArrayToObject } from '../../common/helpers/translation-array-to-object'

@Injectable()
export class CarouselService {
	private readonly repo: CarouselRepo
	private readonly translationService: TranslationService
	constructor(repo: CarouselRepo, translationService: TranslationService) {
		this.repo = repo
		this.translationService = translationService
	}

	async getAll(payload: CarouselGetAllRequest, lang: LanguageEnum): Promise<CarouselGetAllResponse | CarouselGetOneResponse[]> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name, payload.description],
			tableFields: [TranslatedTableFields.carouselName, TranslatedTableFields.carouselDescription],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.id)) {
				tableIds.push(tr.id)
			}
		}

		const carousels = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, description: undefined })

		let mappedCarousels
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
			tableIds: Array.isArray(carousels) ? carousels.map((n) => n.id) : carousels.data.map((n) => n.id),
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(carousels)) {
			mappedCarousels = carousels.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.carouselName}`] || b.name,
					description: translatedObject[`${b.id}=${TranslatedTableFields.carouselDescription}`] || b.description,
				}
			})

			return mappedCarousels
		} else {
			mappedCarousels = carousels.data.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.carouselName}`] || b.name,
					description: translatedObject[`${b.id}=${TranslatedTableFields.carouselDescription}`] || b.description,
				}
			})
		}
		return {
			data: mappedCarousels,
			pagesCount: carousels.pagesCount,
			pageSize: carousels.pageSize,
		}
	}

	async getOneById(payload: CarouselGetOneByIdRequest, lang: LanguageEnum): Promise<CarouselGetOneResponse> {
		const carousel = await this.repo.getOneById(payload)
		if (!carousel) {
			throw new BadRequestException('carousel not found')
		}

		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.carouselName, TranslatedTableFields.carouselDescription],
			tableIds: [carousel.id],
		})

		const translatedObject = await TranslationArrayToObject(translations)

		return {
			...carousel,
			name: translatedObject[`${carousel.id}=${TranslatedTableFields.carouselName}`] || carousel.name,
			description: translatedObject[`${carousel.id}=${TranslatedTableFields.carouselDescription}`] || carousel.description,
		}
	}

	async getOne(payload: CarouselGetOneRequest): Promise<CarouselGetOneResponse> {
		const carousel = await this.repo.getOne(payload)

		return carousel
	}

	async create(payload: CarouselCreateRequest): Promise<MutationResponse> {
		const carousel = await this.repo.create(payload)
		await this.createInManyLang(carousel.id, payload, 'create')
		return carousel
	}

	async update(param: CarouselGetOneByIdRequest, payload: CarouselUpdateRequest): Promise<MutationResponse> {
		// await this.checkUpdateFields(param, payload)

		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: CarouselDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}

	private async checkUpdateFields(param: CarouselGetOneByIdRequest, payload: CarouselUpdateRequest): Promise<void> {
		if (Object.values(payload.name).length) {
			const c1 = await this.translationService.getAll2({ text: Object.values(payload.name), tableFields: [TranslatedTableFields.carouselName] })
			c1.forEach((c) => {
				if (c && c.id !== param.id) {
					throw new BadRequestException('this name already exists')
				}
			})
		}

		if (Object.values(payload.description).length) {
			const c1 = await this.translationService.getAll2({ text: Object.values(payload.description), tableFields: [TranslatedTableFields.carouselDescription] })
			c1.forEach((c) => {
				if (c && c.id !== param.id) {
					throw new BadRequestException('this description already exists')
				}
			})
		}
	}

	private async createInManyLang(id: string, payload: CarouselUpdateRequest, functionality: string): Promise<void> {
		if (functionality === 'create') {
			await this.translationService.createMany({
				datas: [
					...Object.keys(payload.name).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.carouselName,
						tableId: id,
						text: payload.name[k],
					})),
					...Object.keys(payload.description).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.carouselDescription,
						tableId: id,
						text: payload.description[k],
					})),
				],
			})
		} else {
			for (const k of Object.keys(payload.name)) {
				const exists = await this.translationService.getAll({
					language: k as LanguageEnum,
					tableFields: [TranslatedTableFields.carouselName],
					tableIds: [id],
				})

				if (exists.length) {
					await this.translationService.update({ id: exists[0].id }, { text: payload.name[k as LanguageEnum] })
				} else {
					await this.translationService.create({
						language: k as LanguageEnum,
						tableField: TranslatedTableFields.carouselName,
						tableId: id,
						text: payload.name[k as LanguageEnum],
					})
				}
			}

			for (const k of Object.keys(payload.description)) {
				const exists = await this.translationService.getAll({
					language: k as LanguageEnum,
					tableFields: [TranslatedTableFields.carouselDescription],
					tableIds: [id],
				})

				if (exists.length) {
					await this.translationService.update({ id: exists[0].id }, { text: payload.description[k as LanguageEnum] })
				} else {
					await this.translationService.create({
						language: k as LanguageEnum,
						tableField: TranslatedTableFields.carouselDescription,
						tableId: id,
						text: payload.description[k as LanguageEnum],
					})
				}
			}
		}
	}
}
