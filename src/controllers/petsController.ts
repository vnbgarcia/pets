import { Request, Response } from "express";
import { PetsService } from "../services/petsService";

const service = new PetsService();

export const listPets = async (req: Request, res: Response) => {
  res.status(200).json(await service.fetchPets());
};

export const createPet = async (req: Request, res: Response) => {
  const result = await service.createPet(req.body);
  res.status(201).json(result);
};

export const getPetById = (req: Request, res: Response) => {
  console.log('get pet by id');
};

export const updatePetById = (req: Request, res: Response) => {
  console.log('update pet by id');
};

export const deletePetById = (req: Request, res: Response) => {
  console.log('delete pet by id');
};