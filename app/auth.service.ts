import { ErrorHandler } from '../src/helpers/error';
import { signupUser, searchUsername } from './auth.repository';

const search = async (username: string): Promise<true | false> => {
    try {
      const user = await searchUsername(username);
      if (user) {
        return true;
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