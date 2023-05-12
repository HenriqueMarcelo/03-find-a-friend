import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchOrganizationCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchOrganizationCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchOrganizationCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return useCase
}
