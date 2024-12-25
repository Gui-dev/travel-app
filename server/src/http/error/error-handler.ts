import type { FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { ClientError } from './errors/client-error'

type IFastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: IFastifyErrorHandler = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Invalid input',
      errors: error.validation,
    })
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  console.log(error)
  console.log('TYPE: ', typeof error)

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
