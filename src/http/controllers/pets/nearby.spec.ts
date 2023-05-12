import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'

describe.skip('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search Pets', async () => {
    const { token } = await createAndAuthenticateOrganization(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Pet',
        description: null,
        phone: null,
        latitude: -22.2498094,
        longitude: -42.4331477,
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Pet',
        description: null,
        phone: null,
        latitude: -22.1582797,
        longitude: -42.4221876,
      })

    const response = await request(app.server)
      .get('/pets/nearby')
      .query({
        latitude: -22.2498094,
        longitude: -42.4331477,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        title: 'Near Pet',
      }),
    ])
  })
})
