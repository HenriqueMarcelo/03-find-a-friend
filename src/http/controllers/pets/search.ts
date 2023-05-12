import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchPetBodySchema.parse(request.query)

  const searchPetUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ pets })
}
