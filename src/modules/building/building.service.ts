import { BadRequestException, Injectable } from '@nestjs/common'
import { BuildingRepo } from './building.repo'
import {
	BuildingCreateRequest,
	BuildingDeleteRequest,
	BuildingGetAllRequest,
	BuildingGetAllResponse,
	BuildingGetOneByIdRequest,
	BuildingGetOneRequest,
	BuildingGetOneResponse,
	BuildingUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'
import { TranslationService } from '../translation'
import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../common'
import { TranslationArrayToObject } from '../../common/helpers/translation-array-to-object'

@Injectable()
export class BuildingService {
	private readonly repo: BuildingRepo
	private readonly translationService: TranslationService
	constructor(repo: BuildingRepo, translationService: TranslationService) {
		this.repo = repo
		this.translationService = translationService
	}

	async getAll(payload: BuildingGetAllRequest, lang: LanguageEnum): Promise<BuildingGetAllResponse | BuildingGetOneResponse[]> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name, payload.address],
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.id)) {
				tableIds.push(tr.id)
			}
		}

		const buildings = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, address: undefined })

		let mappedBuildings
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.newName, TranslatedTableFields.newDescription],
			tableIds: Array.isArray(buildings) ? buildings.map((n) => n.id) : buildings.data.map((n) => n.id),
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(buildings)) {
			mappedBuildings = buildings.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`] || b.name,
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`] || b.address,
				}
			})

			return mappedBuildings
		} else {
			mappedBuildings = buildings.data.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`] || b.name,
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`] || b.address,
				}
			})
		}
		return {
			data: mappedBuildings,
			pagesCount: buildings.pagesCount,
			pageSize: buildings.pageSize,
		}
	}

	async getOneById(payload: BuildingGetOneByIdRequest, lang: LanguageEnum): Promise<BuildingGetOneResponse> {
		const building = await this.repo.getOneById(payload)
		if (!building) {
			throw new BadRequestException('building not found')
		}

		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress],
			tableIds: [building.id],
		})

		const translatedObject = await TranslationArrayToObject(translations)

		return {
			...building,
			name: translatedObject[`${building.id}=${TranslatedTableFields.buildingName}`] || building.name,
			address: translatedObject[`${building.id}=${TranslatedTableFields.buildingAddress}`] || building.address,
		}
	}

	async getOne(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.repo.getOne(payload)

		return building
	}

	async getOneWithOr(payload: BuildingGetOneRequest): Promise<BuildingGetOneResponse> {
		const building = await this.repo.getOneWithOr(payload)

		return building
	}

	async create(payload: BuildingCreateRequest): Promise<MutationResponse> {
		const existsInTr = await this.translationService.getAll2({ text: [payload.name.uz, payload.name.ru, payload.name.en], tableFields: [TranslatedTableFields.buildingName] })
		if (existsInTr.length) {
			throw new BadRequestException('building name already exists')
		}

		const existsInTr2 = await this.translationService.getAll2({
			text: [payload.address.uz, payload.address.ru, payload.address.en],
			tableFields: [TranslatedTableFields.buildingAddress],
		})
		if (existsInTr2.length) {
			throw new BadRequestException('building address already exists')
		}

		const building = await this.repo.create(payload)
		await this.createInManyLang(building.id, payload, 'create')
		return building
	}

	async update(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<MutationResponse> {
		await this.checkUpdateFields(param, payload)

		return this.repo.update({ ...param, ...payload })
	}

	async delete(payload: BuildingDeleteRequest): Promise<MutationResponse> {
		return this.repo.delete(payload)
	}

	private async checkUpdateFields(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<void> {
		if (Object.values(payload.name).length) {
			const c1 = await this.translationService.getAll2({ text: Object.values(payload.name), tableFields: [TranslatedTableFields.buildingName] })
			c1.forEach((c) => {
				if (c && c.id !== param.id) {
					throw new BadRequestException('this name already exists')
				}
			})
		}

		if (Object.values(payload.address).length) {
			const c1 = await this.translationService.getAll2({ text: Object.values(payload.address), tableFields: [TranslatedTableFields.buildingAddress] })
			c1.forEach((c) => {
				if (c && c.id !== param.id) {
					throw new BadRequestException('this address already exists')
				}
			})
		}

		if (payload.phoneNumber) {
			const c3 = await this.repo.getOne({ phoneNumber: payload.phoneNumber })
			if (c3 && c3.id !== param.id) {
				throw new BadRequestException('this phone number already exists')
			}
		}
	}

	private async createInManyLang(id: string, payload: BuildingUpdateRequest, functionality: string): Promise<void> {
		if (functionality === 'create') {
			await this.translationService.createMany({
				datas: [
					...Object.keys(payload.name).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.buildingName,
						tableId: id,
						text: payload.name[k],
					})),
					...Object.keys(payload.address).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.buildingAddress,
						tableId: id,
						text: payload.address[k],
					})),
				],
			})
		} else {
			for (const k of Object.keys(payload.name)) {
				const exists = await this.translationService.getAll({
					language: k as LanguageEnum,
					tableFields: [TranslatedTableFields.buildingName],
					tableIds: [id],
				})

				if (exists.length) {
					await this.translationService.update({ id: exists[0].id }, { text: payload.name[k as LanguageEnum] })
				} else {
					await this.translationService.create({
						language: k as LanguageEnum,
						tableField: TranslatedTableFields.buildingName,
						tableId: id,
						text: payload.name[k as LanguageEnum],
					})
				}
			}

			for (const k of Object.keys(payload.address)) {
				const exists = await this.translationService.getAll({
					language: k as LanguageEnum,
					tableFields: [TranslatedTableFields.buildingAddress],
					tableIds: [id],
				})

				if (exists.length) {
					await this.translationService.update({ id: exists[0].id }, { text: payload.address[k as LanguageEnum] })
				} else {
					await this.translationService.create({
						language: k as LanguageEnum,
						tableField: TranslatedTableFields.buildingAddress,
						tableId: id,
						text: payload.address[k as LanguageEnum],
					})
				}
			}
		}
	}
}
