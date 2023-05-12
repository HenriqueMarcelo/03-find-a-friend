import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetOrganizationMetricsUseCaseRequest {
  userId: string
}

interface GetOrganizationMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetOrganizationMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetOrganizationMetricsUseCaseRequest): Promise<GetOrganizationMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByOrganizationId(userId)

    return {
      checkInsCount,
    }
  }
}
