import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchOrganizationCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchOrganizationCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchOrganizationCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchOrganizationCheckInsHistoryUseCaseRequest): Promise<FetchOrganizationCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByOrganizationId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
