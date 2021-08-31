import { ErrorHandler } from '../helpers/error';
import { createOneUser } from './auth.repository'

const createUser = async (user: User): Promise<User> => {
  try {
      const create = await createOneUser(user);
      if (!create) {
        throw new ErrorHandler(404, 'Task did not found');
      }
      return create;
    } catch (error) {
      throw error;
    }
}

export { createUser };