

//conexion a la base de datos con moogose
import mongoose,{ConnectOptions} from 'mongoose';

const dbConnection = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_CNN_STRING!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }as ConnectOptions);

        const url = `${db.connection.host}:${db.connection.port}`;
   
    } catch (error) {
        console.log(error);
    }
};

export { dbConnection };