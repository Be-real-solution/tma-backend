import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { CResponse } from '../../interfaces'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		console.log(exception)
		const response = host.switchToHttp().getResponse<Response>()
		const cResponse: CResponse<null> = {
			data: null,
			status: exception?.status || 500,
			error: exception?.response?.error || 'server error',
			errorMessage: Array.isArray(exception?.response?.message) ? exception?.response?.message : [exception?.response?.message || 'internal server error'],
			warning: [],
		}
		response.status(exception?.status || 500).json(cResponse)
	}
}
