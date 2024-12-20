import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { confirmParticipantsUseCase } from '../../use-cases/confirm-participant'
import { confirmParticipantValidation } from '../validations/confirm-participant-validation'

export const confirmParticipant: FastifyPluginAsyncZod = async app => {
  app.get(
    '/participants/:participant_id/confirm',
    {
      schema: {
        params: confirmParticipantValidation,
      },
    },
    async (request, reply) => {
      const { participant_id } = request.params

      const participant = await confirmParticipantsUseCase({ participant_id })

      return reply.redirect(
        `http://localhost:3000/participants/${participant.id}`,
      )
    },
  )
}
