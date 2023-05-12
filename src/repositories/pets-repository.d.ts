import { Pet, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Pet[]>
  searchMany(query: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
