import z from 'zod'

export const getTripDetailsParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
