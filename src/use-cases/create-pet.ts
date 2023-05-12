import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      pet,
    }
  }
}
