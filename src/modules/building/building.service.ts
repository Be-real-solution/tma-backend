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
import { CResponse, MutationResponse } from '../../interfaces'
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

	async getAll(payload: BuildingGetAllRequest, lang: LanguageEnum): Promise<CResponse<BuildingGetAllResponse | BuildingGetOneResponse[]>> {
		const searchedData = await this.translationService.getAll({
			language: lang,
			text: [payload.name ?? '', payload.address ?? '', payload.description ?? ''],
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress, TranslatedTableFields.buildingDescription],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}

		const buildings = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, address: undefined, description: undefined })

		let mappedBuildings
		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress, TranslatedTableFields.buildingDescription],
			tableIds: Array.isArray(buildings) ? buildings.map((b) => b.id) : buildings.data.map((b) => b.id),
		})

		const translatedObject = await TranslationArrayToObject(translations)

		if (Array.isArray(buildings)) {
			mappedBuildings = buildings.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`] || b.name,
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`] || b.address,
					description: translatedObject[`${b.id}=${TranslatedTableFields.buildingDescription}`] || b.description,
				}
			})

			return { data: mappedBuildings, status: 200 }
		} else {
			mappedBuildings = buildings.data.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`] || b.name,
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`] || b.address,
					description: translatedObject[`${b.id}=${TranslatedTableFields.buildingDescription}`] || b.description,
				}
			})
		}
		return {
			status: 200,
			data: {
				data: mappedBuildings,
				pagesCount: buildings.pagesCount,
				pageSize: buildings.pageSize,
			},
		}
	}

	async getAllForAdmin(payload: BuildingGetAllRequest): Promise<CResponse<BuildingGetAllForAdminResponse | BuildingGetOneForAdminResponse[]>> {
		const searchedData = await this.translationService.getAll({
			text: [payload.name ?? '', payload.address ?? '', payload.description ?? ''],
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress, TranslatedTableFields.buildingDescription],
		})

		const tableIds: string[] = []
		for (const tr of searchedData) {
			if (!tableIds.includes(tr.tableId)) {
				tableIds.push(tr.tableId)
			}
		}

		const buildings = await this.repo.getAll({ ...payload, ids: tableIds, name: undefined, address: undefined, description: undefined })

		let mappedBuildings
		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress, TranslatedTableFields.buildingDescription],
			tableIds: Array.isArray(buildings) ? buildings.map((b) => b.id) : buildings.data.map((b) => b.id),
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		if (Array.isArray(buildings)) {
			mappedBuildings = buildings.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`],
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`],
					description: translatedObject[`${b.id}=${TranslatedTableFields.buildingDescription}`],
				}
			})

			return { data: mappedBuildings, status: 200 }
		} else {
			mappedBuildings = buildings.data.map((b) => {
				return {
					...b,
					name: translatedObject[`${b.id}=${TranslatedTableFields.buildingName}`],
					address: translatedObject[`${b.id}=${TranslatedTableFields.buildingAddress}`],
					description: translatedObject[`${b.id}=${TranslatedTableFields.buildingDescription}`],
				}
			})
		}
		return {
			data: {
				data: mappedBuildings,
				pagesCount: buildings.pagesCount,
				pageSize: buildings.pageSize,
			},
			status: 200,
		}
	}

	async getOneById(payload: BuildingGetOneByIdRequest, lang: LanguageEnum): Promise<CResponse<BuildingGetOneResponse>> {
		const building = await this.repo.getOneById(payload)
		if (!building) {
			throw new BadRequestException('building not found')
		}

		const translations = await this.translationService.getAll({
			language: lang,
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress, TranslatedTableFields.buildingDescription],
			tableIds: [building.id],
		})

		const translatedObject = await TranslationArrayToObject(translations)

		return {
			status: 200,
			data: {
				...building,
				name: translatedObject[`${building.id}=${TranslatedTableFields.buildingName}`] || building.name,
				address: translatedObject[`${building.id}=${TranslatedTableFields.buildingAddress}`] || building.address,
				description: translatedObject[`${building.id}=${TranslatedTableFields.buildingDescription}`] || building.description,
			},
		}
	}

	async getOneByIdForAdmin(payload: BuildingGetOneByIdRequest): Promise<CResponse<BuildingGetOneForAdminResponse>> {
		const building = await this.repo.getOneById(payload)
		if (!building) {
			throw new BadRequestException('building not found')
		}

		const translations = await this.translationService.getAll({
			tableFields: [TranslatedTableFields.buildingName, TranslatedTableFields.buildingAddress, TranslatedTableFields.buildingDescription],
			tableIds: [building.id],
		})

		const translatedObject = await TranslationArrayToObject2(translations)

		return {
			status: 200,
			data: {
				...building,
				name: translatedObject[`${building.id}=${TranslatedTableFields.buildingName}`],
				address: translatedObject[`${building.id}=${TranslatedTableFields.buildingAddress}`],
				description: translatedObject[`${building.id}=${TranslatedTableFields.buildingDescription}`],
			},
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

	async create(payload: BuildingCreateRequest): Promise<CResponse<MutationResponse>> {
		const existsInTr = await this.translationService.getAll2({ text: [payload.name.uz, payload.name.ru, payload.name.en], tableFields: [TranslatedTableFields.buildingName] })
		if (existsInTr.length) {
			throw new BadRequestException('building name already exists')
		}

		const building = await this.repo.create(payload)
		payload.images.length ? await this.buildingImageService.createMany({ datas: payload.images.map((i) => ({ buildingId: building.id, imageLink: i.filename })) }) : null
		await this.createInManyLang(building.id, payload, 'create')

		return { data: building, status: 200 }
	}

	async update(param: BuildingGetOneByIdRequest, payload: BuildingUpdateRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOneByIdForAdmin(param)
		if (!ca) {
			throw new BadRequestException('building not found')
		}
		await this.checkUpdateFields(param, payload)

		const building = await this.repo.update({ ...param, ...payload })
		payload.imagesToDelete?.length ? await this.buildingImageService.deleteMany({ ids: payload.imagesToDelete }) : null
		payload.images?.length ? await this.buildingImageService.createMany({ datas: payload.images.map((i) => ({ buildingId: building.id, imageLink: i.filename })) }) : null
		await this.createInManyLang(building.id, payload, 'update')

		return { data: building, status: 200 }
	}

	async delete(payload: BuildingDeleteRequest): Promise<CResponse<MutationResponse>> {
		const ca = await this.getOneByIdForAdmin(payload)
		if (!ca) {
			throw new BadRequestException('building not found')
		}
		const building = await this.repo.delete(payload)
		await this.translationService.deleteMany({ tableId: building.id })
		return { data: building, status: 200 }
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
					...Object.keys(payload.description).map((k: LanguageEnum) => ({
						language: k,
						tableField: TranslatedTableFields.buildingDescription,
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

			if (payload.description && Object.values(payload.description).length) {
				for (const k of Object.keys(payload.description)) {
					const exists = await this.translationService.getAll({
						language: k as LanguageEnum,
						tableFields: [TranslatedTableFields.buildingDescription],
						tableIds: [id],
					})

					if (exists.length) {
						await this.translationService.update({ id: exists[0].id }, { text: payload.description[k as LanguageEnum] })
					} else {
						await this.translationService.create({
							language: k as LanguageEnum,
							tableField: TranslatedTableFields.buildingDescription,
							tableId: id,
							text: payload.description[k as LanguageEnum],
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
