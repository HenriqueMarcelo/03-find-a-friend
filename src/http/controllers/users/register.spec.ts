import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
    })

    console.log(response.body)
    expect(response.statusCode).toEqual(201)
  })
})
