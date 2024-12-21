import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createLinkUseCase } from '../../use-cases/create-links'
import {
  createLinksBodyValidation,
  createLinksParamsValidation,
} from '../validations/create-links-validation'

export const createLink: FastifyPluginAsyncZod = async app => {
  app.post(
    '/trips/:trip_id/links',
    {
      schema: {
        params: createLinksParamsValidation,
        body: createLinksBodyValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params
      const { title, url } = request.body

      const { link } = await createLinkUseCase({
        trip_id,
        title,
        url,
      })

      return reply.status(201).send({ link_id: link.id })
    },
  )
}
