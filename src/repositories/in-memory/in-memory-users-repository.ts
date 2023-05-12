import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      adress: data.adress || null,
      cep: data.cep || null,
      city: data.city,
      uf: data.uf,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
