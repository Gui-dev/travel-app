import z from 'zod'

export const updateTripParamsValidation = z.object({
  trip_id: z.string().uuid(),
})

export const updateTripBodyValidation = z.object({
  destination: z.string().min(4),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
})
