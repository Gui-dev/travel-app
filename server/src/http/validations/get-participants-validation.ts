import z from 'zod'

export const getParticipantsParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
