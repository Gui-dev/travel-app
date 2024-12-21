import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createAcitivitiesUseCase } from '../../use-cases/create-activities'
import {
  createActivitiesBodyValidation,
  createActivitiesParamsValidation,
} from '../validations/create-activities-validation'

export const createActivity: FastifyPluginAsyncZod = async app => {
  app.post(
    '/trips/:trip_id/activities',
    {
      schema: {
        params: createActivitiesParamsValidation,
        body: createActivitiesBodyValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params
      const { title, occurs_at } = request.body

      const { activity } = await createAcitivitiesUseCase({
        trip_id,
        title,
        occurs_at,
      })

      return reply.status(201).send({ activity_id: activity.id })
    },
  )
}
