import type { Link } from '@prisma/client'
import { ClientError } from '../http/error/errors/client-error'
import { prisma } from '../lib/prisma'

interface IGetLinksUseCaseRequest {
  trip_id: string
}

interface IGetLinksUseCaseResponse {
  links: Link[]
}

export const getLinksUseCase = async ({
  trip_id,
}: IGetLinksUseCaseRequest): Promise<IGetLinksUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
    include: {
      links: true,
    },
  })

  if (!trip) {
    throw new ClientError('Trip not found')
  }

  return {
    links: trip.links,
  }
}
