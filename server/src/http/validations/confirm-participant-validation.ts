import z from 'zod'

export const confirmParticipantValidation = z.object({
  participant_id: z.string().uuid(),
})
