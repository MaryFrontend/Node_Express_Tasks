import { ErrorHandler } from '../helpers/error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './secret';
import { signupUser, searchLogin } from './auth.repository';

const signup = async (user: User): Promise< Boolean > => {
  try {
    const exist = await searchLogin(user);
    if (!exist) {
      user.password = bcrypt.hashSync(user.password, 8);
      const create = await signupUser(user);
      if (!create) {
        throw new ErrorHandler(404, 'User is not registered!');
      }
      return true;
    }
    throw new ErrorHandler(404, 'User is not registered!');//
  } catch (error) {
    throw error;
  }
};

const login = async (user: User): Promise<Object | false> => {
  try {
    const loginUser = await searchLogin(user);
    if (!loginUser) {
      throw new ErrorHandler(404, 'Wrong login!');
    }

    const passwordIsValid = (user, password) => bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new ErrorHandler(404, 'Wrong password!');
    }

    const token = (user) =>
      jwt.sing({ id: user._id }, config.secret, {
        expiresIn: 86400,
      });

    return token;
  } catch (error) {
    throw error;
  }
};


export { signup, login };
