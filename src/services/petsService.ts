import { z } from "zod";
import { notFoundError } from "../models/exceptions";
import Pet from "../models/pet";

const notFound = new notFoundError("pet not found");

export class PetsService {
  petRequest = z.object({
    name: z.string().min(3).max(50),
    age: z.optional(z.number().int().min(0)),
    breed: z.optional(z.string().max(25)),
    color: z.optional(z.string().max(25)),
    gender: z.optional(z.string().max(25)),
});

  async fetchPets(): Promise<Pet[]> {
    return await Pet.findAll();
  }

  async getPet(id: number): Promise<Pet | undefined> {
    const foundPet = await Pet.findByPk(id);
    if (foundPet === null) throw notFound;
    return foundPet;
  }

  async createPet(pet: Pet): Promise<Pet> {
    const createdPet = await Pet.create({ ...pet });
    return createdPet;
  }

  async updatePet(id: number, pet: Pet): Promise<void> {
    const dontExists = (await Pet.findByPk(id)) === null;
    if (dontExists) throw notFound;
    await Pet.update({ ...pet }, { where: { id } });
  }

  async deletePet(id: number): Promise<void> {
    const dontExists = (await Pet.findByPk(id)) === null;
    if (dontExists) throw notFound;
    await Pet.destroy({ where: { id } });
  }
}
