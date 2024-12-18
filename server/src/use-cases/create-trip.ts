import type { Trip } from '@prisma/client'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import nodemailer from 'nodemailer'
import { getMailClient } from '../lib/mail'
import { prisma } from '../lib/prisma'

dayjs.locale(ptBR)
dayjs.extend(localizedFormat)

interface ICreateTripRequest {
  destination: string
  starts_at: Date
  ends_at: Date
  owner_name: string
  owner_email: string
  emails_to_invite: string[]
}

interface ICreateTripResponse {
  trip: Trip
}

export const createTripUseCase = async ({
  destination,
  starts_at,
  ends_at,
  owner_name,
  owner_email,
  emails_to_invite,
}: ICreateTripRequest): Promise<ICreateTripResponse> => {
  if (dayjs(starts_at).isBefore(new Date())) {
    throw new Error('Invalid trip start date')
  }

  if (dayjs(ends_at).isBefore(starts_at)) {
    throw new Error('Invalid trip end date')
  }

  const trip = await prisma.trip.create({
    data: {
      destination,
      starts_at,
      ends_at,
      participants: {
        createMany: {
          data: [
            {
              name: owner_name,
              email: owner_email,
              is_owner: true,
              is_confirmed: true,
            },
            ...emails_to_invite.map(email => {
              return {
                email,
              }
            }),
          ],
        },
      },
    },
  })

  const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`
  const formattedStartDate = dayjs(starts_at).format('LL')
  const formattedEndDate = dayjs(ends_at).format('LL')

  const mail = await getMailClient()
  const message = await mail.sendMail({
    from: {
      name: 'Equipe travel.app',
      address: 'hello@travel.com',
    },
    to: {
      name: owner_name,
      address: owner_email,
    },
    subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
    html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
        <p>Você solicitou a criação de uma viagem para 
          <strong>${destination}</strong>, Brasil nas datas 
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

  return {
    trip,
  }
}
