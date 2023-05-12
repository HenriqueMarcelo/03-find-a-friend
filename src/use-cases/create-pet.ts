import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { OrganizationsRepository } from '@/repositories/users-repository'

interface CreatePetUseCaseRequest {
  name: string | null
  description: string | null
  energy: number | null
  birth: string | null
  size: number | null
  organization_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    description,
    energy,
    birth,
    size,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    console.log(this.organizationsRepository)
    const organization = await this.organizationsRepository.findById(
      organization_id,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      energy,
      birth,
      size,
      organization_id: organization.id,
    })

    return {
      pet,
    }
  }
}
