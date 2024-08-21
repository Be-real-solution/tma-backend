import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma'
import { AdminGetOneRequest, AdminGetOneResponse } from '../admin/interfaces'

@Injectable()
export class AuthRepo {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async adminGetOne(payload: AdminGetOneRequest): Promise<AdminGetOneResponse & { password: string }> {
		const admin = await this.prisma.admin.findFirst({
			where: {
				deletedAt: null,
				fullName: payload.fullName,
				username: payload.username,
			},
			select: { createdAt: true, fullName: true, id: true, password: true, username: true },
		})

		return admin
	}
}
