import z from 'zod'

export const getActivitiesParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
