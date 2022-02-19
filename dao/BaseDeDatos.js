import NLU from "../models/NLU.js"

class ErrorNameAlreadyExists extends Error {

    constructor() {

        super();
        this.name = 'Error: ya existe una estructura con el mismo nombre.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorNameDoesNotExist extends Error {

    constructor() {

        super();
        this.name = 'Error: no existe una estructura con ese nombre.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorFieldIsEmpty extends Error {

    constructor(field) {

        super();
        this.name = 'Error: no se ha ingresado ' + field + '.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorIdDoesNotExist extends Error {

    constructor(id) {

        super();
        this.name = "Error: la ID no existe.";
        Error.captureStackTrace(this, this.constructor);
    }
}



class BaseDeDatos {

    constructor() {
        this.NLUModel = NLU;
    }

    async get_nlu_structure() {
        
        const nlu_structure = this.NLUModel.find({});
        return nlu_structure;
    } //fin get total

    async get_nlu_structure_name(nombre) {
        
        if (nombre == null || nombre === '') {
            console.log("Error: nombre vacío.");
            throw new ErrorFieldIsEmpty("nombre");
        }

        if(!(await this.nlu_structure_name_exists(nombre))) {

            //console.log("Error: nombre inexistente.");
            throw new ErrorNameDoesNotExist();
        }


        return this.NLUModel.findOne({
                name: nombre
            })
            .lean()
            .then(result => {
                return result
            })
            .catch(e => {
                throw e;
            });
    } //fin get por nombre


    async nlu_structure_name_exists(name) {
       
        return this.NLUModel.findOne({
                name: name
            })
            .select("name")
            .lean()
            .then(result => {
                //console.log(result != null);
                return result != null;
            });
    }

    // el id no tiene que ser nunca manipulado por el usuario
    async nlu_structure_id_exists(id) {


        return this.NLUModel.findOne({
                _id: id
            })
            .select("id")
            .lean()
            .then(result => {
                return result != null;
            });
    }
    //********** */
    async add_nlu_structure(name, text) {

        if (name == null || name === '') {
            console.log("Error: nombre vacío.");
            throw new ErrorFieldIsEmpty("nombre");
        }

        if (text == null || text === '') {
            console.log("Error: texto vacío.");
            throw new ErrorFieldIsEmpty("texto");
        }

        if (await this.nlu_structure_name_exists(name)) {
            console.log("Error: " + name + " ya existe.");
            throw new ErrorNameAlreadyExists();
        }

        console.log("Estructura nueva, se agrega a la base de datos.");
        const obj = JSON.stringify({
            name: name,
            text: text
        });
        const nlu_structure = new this.NLUModel(JSON.parse(obj));
        nlu_structure.save();
        return nlu_structure;
    }

    async put_nlu_structure(id, name, text) {
        // el put tiene que ir dentro de un try catch para  que no tire error con el unique del nombre

        try {
            if (id == null || id === '') {
                console.log("Error: ID vacía.");
                throw new ErrorFieldIsEmpty("id");
            }

            if(!(await this.nlu_structure_id_exists(id))) {

                console.log("Error: ID no existe.");
                throw new ErrorIdDoesNotExist();
            }

            if (name === '') {

                name = null;
            }

            if (text === '') {

                text = null;
            }

            let name_is_empty = (name == null);
            let text_is_empty = (text == null);

            if (name_is_empty && text_is_empty) {
                console.log("Error: nombre y texto vacío.");
                throw new ErrorFieldIsEmpty("nombre y texto");
            }


            let valores = null;

            try {

                valores = await this.get_nlu_structure_name(name);

            } catch (error) {


            }

            if (valores) {

                console.log("Error: " + name + " ya existe.");
                throw new ErrorNameAlreadyExists();
            }

            const obj = JSON.stringify({
                name: name,
                text: text
            });
            let nlu_structure = new this.NLUModel(JSON.parse(obj));

            await this.NLUModel.findByIdAndUpdate(id, JSON.parse(obj), {
                new: true
            }, function (err, nlu_structure) {

                if (err) {
                    console.log("Error: " + err.toString());
                } else {
                    console.log("Updated id: ", id);
                }
            });

            return nlu_structure;


        } catch (e) {

            throw e;
        }
    }
    //fin put

    async delete_nlu_structure(id) {

        if(!(await this.nlu_structure_id_exists(id))) {

            console.log("Error: ID no existe.");
            throw new ErrorIdDoesNotExist();
        }

        if (id == null || id === '') {
            console.log("Error: ID vacía.");
            throw new ErrorFieldIsEmpty("id");
        }

        return this.NLUModel.findByIdAndDelete(id);
    }
}

export default BaseDeDatos;