import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findByOrganizationIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null>
  findById(id: string): Promise<CheckIn | null>
  findManyByOrganizationId(userId: string, page: number): Promise<CheckIn[]>
  countByOrganizationId(userId: string): Promise<number>
}
