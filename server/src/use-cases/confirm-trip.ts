import type { Trip } from '@prisma/client'
import nodemailer from 'nodemailer'
import { ClientError } from '../http/error/errors/client-error'
import { dayjs } from './../lib/dayjs'
import { getMailClient } from './../lib/mail'
import { prisma } from './../lib/prisma'

interface IConfirmTripRequest {
  trip_id: string
}

export const confirmTripUseCase = async ({
  trip_id,
}: IConfirmTripRequest): Promise<Trip> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
    include: {
      participants: {
        where: {
          is_owner: false,
        },
      },
    },
  })

  if (!trip) {
    throw new ClientError('Trip not found')
  }

  if (trip.is_confirmed) {
    throw new ClientError('Trip already confirmed')
  }

  await prisma.trip.update({
    where: {
      id: trip_id,
    },
    data: {
      is_confirmed: true,
    },
  })

  const formattedStartDate = dayjs(trip.starts_at).format('LL')
  const formattedEndDate = dayjs(trip.ends_at).format('LL')

  const mail = await getMailClient()
  await Promise.all(
    trip.participants.map(async participant => {
      const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`
      const message = await mail.sendMail({
        from: {
          name: 'Equipe travel.app',
          address: 'hello@travel.com',
        },
        to: participant.email,
        subject: `Confirme sua viagem para ${trip.destination} em ${formattedStartDate}`,
        html: `
          <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você foi convidado para participar de uma viagem para  
              <strong>${trip.destination}</strong>, nas datas 
              <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>
            </p>
            <br />
            <p>Para confirmar sua viagem, clique no link abaixo:</p>
            <br />
            <p>
              <a href="${confirmationLink}">Confirmar viagem</a>
            </p>
            <br />
            <p>Caso esteja usando o dispositivo móvel, você também pode confirmar a criação de viagem pelos aplicativos</p>
            <p>Caso vcê não saiba do que se trata esse e-mail, apenas ignore</p>
          </div>
        `,
      })

      console.log(nodemailer.getTestMessageUrl(message))
    }),
  )

  return trip
}
