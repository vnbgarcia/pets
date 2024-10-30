import User from "../models/user";
import { BadRequestError, notFoundError } from "../models/exceptions";

const notFound = new notFoundError("Pet not found");
const badRequest = new BadRequestError("Cant create the record");

export class UserService {
  async create(userData: { name: string; email: string; password: string }) {
    const existingUser = await User.count({
      where: { email: userData.email },
    });
    if (existingUser > 0) throw badRequest;
    const createdUser = await User.create(userData);
    return User.findByPk(createdUser.id, {
      attributes: { exclude: ["password"] },
    });
  }

  async getUser(id: number) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (user === null) throw notFound;
    return user;
  }

  async update(id: number, userData: Partial<User>) {
    const user = await User.findByPk(id);
    if (user === null) throw notFound;

    if (userData.email && userData.email !== user.email) {
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });
      if (existingUser) throw badRequest;
    }

    return await user.update(userData);
  }

  async delete(id: number) {
    const user = await User.findByPk(id);
    if (user === null) throw notFound;
    await user.destroy();
  }
}

export default new UserService();
