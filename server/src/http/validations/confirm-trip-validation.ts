import z from 'zod'

export const confirmTripValidation = z.object({
  trip_id: z.string().uuid(),
})
