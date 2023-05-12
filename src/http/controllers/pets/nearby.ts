import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyPetsUseCase } from '@/use-cases/factories/make-fetch-nearby-pets-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyPetsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyPetsQuerySchema.parse(request.query)

  const fetchnearbyPetsUseCase = makeFetchNearbyPetsUseCase()

  const { pets } = await fetchnearbyPetsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ pets })
}
