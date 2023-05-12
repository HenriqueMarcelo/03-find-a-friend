import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyOrganizationRole } from '@/http/middlewares/verify-user-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/pets/search', search)
  app.get('/pets/nearby', nearby)

  app.post('/pets', { onRequest: [verifyOrganizationRole('ADMIN')] }, create)
}
