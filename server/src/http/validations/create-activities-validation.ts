import z from 'zod'

export const createActivitiesBodyValidation = z.object({
  title: z.string().min(4),
  occurs_at: z.coerce.date(),
})

export const createActivitiesParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
