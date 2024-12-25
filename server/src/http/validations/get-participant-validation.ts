import z from 'zod'

export const getParticipantParamsValidation = z.object({
  participant_id: z.string().uuid(),
})
