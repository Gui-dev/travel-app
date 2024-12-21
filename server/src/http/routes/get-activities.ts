import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAcitivitiesUseCase } from '../../use-cases/get-activities'
import { getActivitiesParamsValidation } from '../validations/get-activities-validation'

export const getActivities: FastifyPluginAsyncZod = async app => {
  app.get(
    '/trips/:trip_id/activities',
    {
      schema: {
        params: getActivitiesParamsValidation,
      },
    },
    async (request, reply) => {
      const { trip_id } = request.params

      const activities = await getAcitivitiesUseCase({ trip_id })

      return reply.status(201).send(activities)
    },
  )
}
