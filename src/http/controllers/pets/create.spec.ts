import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
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
        name: 'José',
        description: 'José',
        energy: 1,
        birth: null,
        size: 1,
      })

    console.log(response.body)
    expect(response.statusCode).toEqual(201)
  })
})
