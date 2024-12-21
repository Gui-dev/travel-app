import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getLinksUseCase } from '../../use-cases/get-links'
import { getLinksParamsValidation } from '../validations/get-links-validation'

export const getLinks: FastifyPluginAsyncZod = async app => {
  app.get(
    '/trips/:trip_id/links',
    {
      schema: {
        params: getLinksParamsValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params

      const links = await getLinksUseCase({ trip_id })

      return reply.status(201).send(links)
    },
  )
}
