import { Router } from "express";
import { 
  createPet, 
  deletePetById, 
  getPetById, 
  listPets, 
  updatePetById 
} from "../controllers/petsController";

const petsRouter = Router({ mergeParams: true });
petsRouter.get('/pets', listPets);
petsRouter.post('/pets', createPet);
petsRouter.put('/pets/:petId', deletePetById);
petsRouter.delete('/pets/:petId', updatePetById);
petsRouter.get('/pets/:petId', getPetById);

export default petsRouter;
