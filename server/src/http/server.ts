import cors from '@fastify/cors'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { confirmParticipant } from './routes/confirm-participant'
import { confirmTrip } from './routes/confirm-trip'
import { createActivity } from './routes/create-activity'
import { createInvite } from './routes/create-invite'
import { createLink } from './routes/create-link'
import { createTrip } from './routes/create-trip'
import { getActivities } from './routes/get-activities'
import { getLinks } from './routes/get-links'
import { getParticipant } from './routes/get-participant'
import { getParticipants } from './routes/get-participants'
import { getTripDetails } from './routes/get-trip-details'
import { updateTrip } from './routes/update.trip'

const app = Fastify()
const PORT = Number(process.env.PORT) || 3333

app.register(cors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🔥 Server running on http://localhost:${PORT}`)
  })
