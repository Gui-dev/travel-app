import z from 'zod'

export const createInviteBodyValidation = z.object({
  email: z.string().email(),
})

export const createInviteParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
