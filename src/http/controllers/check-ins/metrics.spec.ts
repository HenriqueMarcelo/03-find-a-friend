import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe.skip('Create Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the total count of check-ins', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const user = await prisma.organization.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        title: 'JavaScript Pet',
        latitude: -22.2498094,
        longitude: -42.4331477,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          pet_id: pet.id,
          user_id: user.id,
        },
        {
          pet_id: pet.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
