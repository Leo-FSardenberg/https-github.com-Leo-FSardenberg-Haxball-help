import {ArgumentsHost, Catch, HttpException, ExceptionFilter, HttpStatus} from '@nestjs/common'
import { Response, Request} from 'express'

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.log(exception)

        const contexto = host.switchToHttp()
        const resposta = contexto.getResponse<Response>()
        const requisicao = contexto.getRequest<Request>()
    
        const {status, body} = exception instanceof HttpException ? {
            status: exception.getStatus(),
            body: exception.getResponse()
        } : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timeStamp: new Date().toISOString(),
                path: requisicao.url
            }
        }

        resposta.status(status).json(body)
    }
}