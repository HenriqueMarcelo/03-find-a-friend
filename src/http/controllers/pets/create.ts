import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    energy: z.coerce.number().nullable(),
    birth: z.string().nullable(),
    size: z.coerce.number().nullable(),
  })

  const { name, description, energy, birth, size } = createPetBodySchema.parse(
    request.body,
  )

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    energy,
    birth,
    size,
    organization_id: request.user.sub,
  })

  return reply.status(201).send()
}
