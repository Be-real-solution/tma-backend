import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtConfig } from '../../configs'
import { PrismaService } from '../../prisma'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		console.log(request.url, request.method)

		if (!token) {
			throw new UnauthorizedException('token not provided')
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, { secret: JwtConfig.accessToken.key })

			if (!payload || !payload?.id) {
				throw new UnauthorizedException('invalid token')
			}
			const admin = await this.prisma.admin.findFirst({ where: { deletedAt: null, id: payload?.id } })
			if (!admin) {
				throw new UnauthorizedException('admin not found with this token')
			}
			request['user'] = payload
		} catch (e) {
			throw new UnauthorizedException(e?.message || e)
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		if (!request.headers.authorization) {
			throw new UnauthorizedException('authorization not provided')
		}
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
