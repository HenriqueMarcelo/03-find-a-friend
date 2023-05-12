import { Pet, Prisma } from '@prisma/client'
import { FindManyNearbyParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoodinates } from '@/utils/get-distance-between-coodinates'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoodinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name ?? null,
      description: data.description ?? null,
      energy: data.energy ?? null,
      birth: new Date(),
      size: data.size ?? null,
      organization_id: data.organization_id ?? null,
    }

    this.items.push(pet)

    return pet
  }
}
