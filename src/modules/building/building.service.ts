import { BadRequestException, Injectable } from '@nestjs/common'
import { BuildingRepo } from './building.repo'
import {
	BuildingCreateRequest,
	BuildingDeleteRequest,
	BuildingGetAllForAdminResponse,
	BuildingGetAllRequest,
	BuildingGetAllResponse,
	BuildingGetOneByIdRequest,
	BuildingGetOneForAdminResponse,
	BuildingGetOneRequest,
	BuildingGetOneResponse,
	BuildingUpdateRequest,
} from './interfaces'
import { MutationResponse } from '../../interfaces'
import { TranslationService } from '../translation'
import { LanguageEnum } from '@prisma/client'
import { TranslatedTableFields } from '../../common'
import { TranslationArrayToObject, TranslationArrayToObject2 } from '../../common/helpers/translation-array-to-object'
import { BuildingImageService } from '../building-image'

@Injectable()
export class BuildingService {
	private readonly repo: BuildingRepo
	private readonly buildingImageService: BuildingImageService
	private readonly translationService: TranslationService
	constructor(repo: BuildingRepo, translationService: TranslationService, buildingImageService: BuildingImageService) {
		this.repo = repo
		this.buildingImageService = buildingImageService
		this.translationService = translationService
	}

	async getAll(payload: BuildingGetAllRequest, lang: LanguageEnum): Promise<BuildingGetAllResponse | BuildingGetOneResponse[]> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name ?? '', payload.address ?? ''],
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}

		const buildings = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, address: undefined })

		let mappedBuildings
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress],
			tableIds: Array.isArray(buildings) ? buildings.map((b) => b.id) : buildings.data.map((b) => b.id),
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

	async getAllForAdmin(payload: BuildingGetAllRequest): Promise<BuildingGetAllForAdminResponse | BuildingGetOneForAdminResponse[]> {
		const searchedData = await this.translationService.getAll({
			text: [payload.name ?? '', payload.address ?? ''],
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}

		const buildings = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, address: undefined })

		let mappedBuildings
		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress],
			tableIds: Array.isArray(buildings) ? buildings.map((b) => b.id) : buildings.data.map((b) => b.id),
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		if (Array.isArray(buildings)) {
			mappedBuildings = buildings.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`],
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`],
				}
			})

			return mappedBuildings
		} else {
			mappedBuildings = buildings.data.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`],
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`],
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

		const building = await this.repo.create(payload)
		payload.images.length ? await this.buildingImageService.createMany({ datas: payload.images.map((i) => ({ buildingId: building.id, imageLink: i.filename })) }) : null
		await this.createInManyLang(building.id, payload, 'create')

		return building
	}

	async update(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<MutationResponse> {
		const ca = await this.getOne(param)
		if (!ca) {
			throw new BadRequestException('building not found')
		}
		await this.checkUpdateFields(param, payload)

		const building = await this.repo.update({ ...param, ...payload })
		payload.imagesToDelete?.length ? await this.buildingImageService.deleteMany({ ids: payload.imagesToDelete }) : null
		payload.images?.length ? await this.buildingImageService.createMany({ datas: payload.images.map((i) => ({ buildingId: building.id, imageLink: i.filename })) }) : null
		await this.createInManyLang(building.id, payload, 'update')

		return building
	}

	async delete(payload: BuildingDeleteRequest): Promise<MutationResponse> {
		const ca = await this.getOne(payload)
		if (!ca) {
			throw new BadRequestException('building not found')
		}
		const building = await this.repo.delete(payload)
		await this.translationService.deleteMany({ tableId: building.id })
		return building
	}

	private async checkUpdateFields(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<void> {
		if (payload.name && Object.values(payload.name).length) {
			const texts = Object.values(payload.name).filter((t) => t !== undefined && t !== null)
			const c1 = await this.translationService.getAll2({
				text: texts,
				tableFields: [TranslatedTableFields.buildingName],
			})
			c1.forEach((c) => {
				if (c && c.tableId !== param.id && c.tableField === TranslatedTableFields.buildingName) {
					throw new BadRequestException('this name already exists')
				}
			})
		}

		if (payload.address && Object.values(payload.address).length) {
			const texts = Object.values(payload.address).filter((t) => t !== undefined && t !== null)

			const c1 = await this.translationService.getAll2({
				text: texts,
				tableFields: [TranslatedTableFields.buildingAddress],
			})
			c1.forEach((c) => {
				if (c && c.tableId !== param.id && c.tableField === TranslatedTableFields.buildingAddress) {
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
			if (payload.name && Object.values(payload.name).length) {
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
			}

			if (payload.address && Object.values(payload.address).length) {
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
}
