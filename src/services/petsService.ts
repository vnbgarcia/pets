import { Pet } from "../models/pet";

const pets: Pet[] = [
  {
    id: 1,
    name: "Rex",
    age: 2,
    breed: "Labrador",
    color: "Brown",
    gender: "Male",
  },
  {
    id: 2,
    name: "Sparky",
    age: 5,
    breed: "Golden Retriever",
    color: "Golden",
    gender: "Male",
  },
];

const notFound = new Error("Pet not found");

export class PetsService {
  async fetchPets(): Promise<Pet[]> {
    return pets;
  }

  async getPet(id: number): Promise<Pet | undefined> {
    const pet = pets.find((p) => p.id === id);
    if (pet === null) throw notFound;
    return pet;
  }

  async createPet(pet: Pet): Promise<Pet> {
    pets.push(pet);
    return pet;
  }

  async updatePet(id: number, pet: Pet): Promise<void> {
    const index = pets.findIndex((p) => p.id === id);
    if (index < 0) throw notFound;
    pets[index] = pet;
  }

  async deletePet(id: number): Promise<void> {
    const index = pets.findIndex((p) => p.id === id);
    if (index < 0) throw notFound;
    pets.splice(index, 1);
  }
}
