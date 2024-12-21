import z from 'zod'

export const createLinksBodyValidation = z.object({
  title: z.string().min(4),
  url: z.string().min(4).url(),
})

export const createLinksParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
