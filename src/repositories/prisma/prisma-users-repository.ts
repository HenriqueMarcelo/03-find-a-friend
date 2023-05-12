import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../users-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string) {
    const user = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const user = await prisma.organization.create({
      data,
    })
    return user
  }
}
