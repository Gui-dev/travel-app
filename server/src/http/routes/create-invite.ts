import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createInviteUseCase } from '../../use-cases/create-invite'
import {
  createInviteBodyValidation,
  createInviteParamsValidation,
} from '../validations/create-invite-validation'

export const createInvite: FastifyPluginAsyncZod = async app => {
  app.post(
    '/trips/:trip_id/invites',
    {
      schema: {
        params: createInviteParamsValidation,
        body: createInviteBodyValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params
      const { email } = request.body

      const { participant } = await createInviteUseCase({
        trip_id,
        email,
      })

      return reply.status(201).send({ participant_id: participant.id })
    },
  )
}
