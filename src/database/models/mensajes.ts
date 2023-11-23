import { Schema, model } from "mongoose";


const MensajeSchema = new Schema({

    de: {
        //hace referenicia del usuario que envia el mensaje y toma el id
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    para: {
        //hace referencia al usuario que recibe el mensaje y toma el id
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },

},{
    //toma la fecha
    timestamps: true
}
)

MensajeSchema.method('toJSON', function (this:any){
    const {__v, ...object} = this.toObject();
    return object;

})

const MensajeModel = model('Mensaje', MensajeSchema);

export default MensajeModel