import { Schema, model } from "mongoose";

interface User extends Document  {
    toObject: any;
    nombre: string;
    email: string;
    imageUrl?: string;
    password: string;
    online: boolean;
}

const UsuarioSchema = new Schema<User>({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
     imageUrl: {
        type: String,
        
    },
    online:{
        type:Boolean,
        default:false
    }

})

UsuarioSchema.method('toJSON', function (this:User){

    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;

})

const UserModel = model<User>('User', UsuarioSchema);

export default UserModel;