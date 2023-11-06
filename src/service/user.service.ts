
import UserModel from "../database/models/usuario";
import { UserClass } from '../interface/User';
import bcrypt  from 'bcrypt';

interface UserProps {
    data: UserClass
}

export class UserService {

    public async createAddUser (data:UserProps) {

        const user = new UserModel(data);
        //todo encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        await user.save();
        return user;
        
    }
}
