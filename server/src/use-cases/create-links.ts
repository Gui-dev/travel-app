import type { Link } from '@prisma/client'
import { prisma } from '../lib/prisma'

interface ICreateLinkUseCaseRequest {
  trip_id: string
  title: string
  url: string
}

interface ICreateLinkUseCaseResponse {
  link: Link
}

export const createLinkUseCase = async ({
  trip_id,
  title,
  url,
}: ICreateLinkUseCaseRequest): Promise<ICreateLinkUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
  })

  if (!trip) {
    throw new Error('Trip not found')
  }

  const link = await prisma.link.create({
    data: {
      trip_id,
      title,
      url,
    },
  })

  return {
    link,
  }
}
