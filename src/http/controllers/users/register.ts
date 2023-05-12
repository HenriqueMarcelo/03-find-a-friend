import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrganizationAlreadyExistsError } from '@/use-cases/erros/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { ARRAY_UFS } from '@/utils/array-ufs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    adress: z.string(),
    cep: z.string(),
    city: z.string(),
    uf: z.enum(ARRAY_UFS),
    whatsapp: z.string(),
  })

  const { name, email, password, adress, cep, city, uf, whatsapp } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      adress,
      cep,
      city,
      uf,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return reply.status(201).send()
}
