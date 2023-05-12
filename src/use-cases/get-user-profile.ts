import { OrganizationsRepository } from '@/repositories/users-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetOrganizationProfileUseCaseRequest {
  userId: string
}

interface GetOrganizationProfileUseCaseResponse {
  user: Organization
}

export class GetOrganizationProfileUseCase {
  constructor(private usersRepository: OrganizationsRepository) {}

  async execute({
    userId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
