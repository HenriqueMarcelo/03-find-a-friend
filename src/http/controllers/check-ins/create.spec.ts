import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe.skip('Create Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const pet = await prisma.pet.create({
      data: {
        title: 'JavaScript Pet',
        // description: 'Some Description',
        // phone: '2225252525',
        latitude: -22.2498094,
        longitude: -42.4331477,
      },
    })

    const response = await request(app.server)
      .post(`/pets/${pet.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.2498094,
        longitude: -42.4331477,
      })

    expect(response.statusCode).toEqual(201)
  })
})
