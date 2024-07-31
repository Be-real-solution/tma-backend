import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'
import { LanguageEnum } from '@prisma/client'
import { Observable } from 'rxjs'

@Injectable()
export class LanguageGuard implements CanActivate {
	private readonly supportedLanguages = Object.values(LanguageEnum)

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const acceptLanguage = request.headers['accept-language']

		if (!acceptLanguage) {
			throw new BadRequestException('Accept-Language header is missing')
		}

		const languages = acceptLanguage.split(',')

		const language = languages.find((lang: any) => this.supportedLanguages.includes(lang.trim()))

		if (language) {
			request.headers['accept-language'] = language.trim()
			return true
		} else {
			throw new BadRequestException('Unsupported language')
		}
	}
}
