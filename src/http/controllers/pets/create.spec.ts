import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'

describe.skip('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a Pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app, true)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Pet',
        description: 'Some Description',
        phone: '2225252525',
        latitude: -22.2498094,
        longitude: -42.4331477,
      })

    expect(response.statusCode).toEqual(201)
  })
})