import UserModel from "../database/models/usuario";


const usuarioConectado = async(uid: string) => {
    const usuario = await UserModel.findById(uid);
    usuario!.online = true;
    await usuario!.save();
}

const usuarioDeconectado = async(uid: string) => {
    const usuario = await UserModel.findById(uid);
    usuario!.online = false;
    await usuario!.save();
}

const getUsuario = async () => {
    const usuarios = await UserModel
        .find()
        .sort('-online');
    return usuarios
}

export {usuarioConectado, usuarioDeconectado, getUsuario}