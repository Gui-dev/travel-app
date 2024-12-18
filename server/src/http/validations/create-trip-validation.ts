import z from 'zod'

export const createTripValidation = z.object({
  destination: z.string().min(4),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
  owner_name: z.string().min(4),
  owner_email: z.string().email().min(4),
  emails_to_invite: z.array(z.string().email()),
})
