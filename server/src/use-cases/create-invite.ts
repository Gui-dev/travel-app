import type { Participant } from '@prisma/client'
import nodemailer from 'nodemailer'
import { ClientError } from '../http/error/errors/client-error'
import { getMailClient } from '../lib/mail'
import { prisma } from '../lib/prisma'
import { dayjs } from './../lib/dayjs'

interface ICreateInviteUseCaseRequest {
  trip_id: string
  email: string
}

interface ICreateInviteUseCaseResponse {
  participant: Participant
}

export const createInviteUseCase = async ({
  trip_id,
  email,
}: ICreateInviteUseCaseRequest): Promise<ICreateInviteUseCaseResponse> => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: trip_id,
    },
  })

  if (!trip) {
    throw new ClientError('Trip not found')
  }

  const participant = await prisma.participant.create({
    data: {
      trip_id,
      email,
    },
  })

  const formattedStartDate = dayjs(trip.starts_at).format('LL')
  const formattedEndDate = dayjs(trip.ends_at).format('LL')

  const mail = await getMailClient()

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

  return {
    participant,
  }
}
