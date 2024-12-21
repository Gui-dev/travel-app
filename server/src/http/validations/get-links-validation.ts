import z from 'zod'

export const getLinksParamsValidation = z.object({
  trip_id: z.string().uuid(),
})
