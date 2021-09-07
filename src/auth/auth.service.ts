import { ErrorHandler } from '../helpers/error';
import { signupUser, searchUsername } from './auth.repository';

const search = async (user: User): Promise<User | false> => {
  try {
    const oneUser = await searchUsername(user);
    if (oneUser) {
      return oneUser;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const signup = async (user: User): Promise<User | false> => {
  try {
    const create = await signupUser(user);
    if (!create) {
      throw new ErrorHandler(404, 'User is not registered!');
    }
    return create;
  } catch (error) {
    throw error;
  }
};

export { signup, search };
