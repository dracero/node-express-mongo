import mongoose from "mongoose";
import NLU from "../models/NLU.js"

class ErrorNameAlreadyExists extends Error {
    
    constructor(name) {
        
        super();
        this.name = 'Error: ya existe una estructura con el mismo nombre.';
        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorNameIsEmpty extends Error {
    
    constructor() {
        
        super();
        this.name = 'Error: no se ha ingresado un nombre.';
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
    
    constructor(){
        this.NLUModel = NLU;
    }

    async get_nlu_structure () {
        
        const nlu_structure = this.NLUModel.find({});
        return nlu_structure;
    }
    
    async nlu_structure_name_exists(name) {
        
        return this.NLUModel.findOne({ name: name })
                            .select("name")
                            .lean()
                            .then(result => {
                                return result != null;
                            });
    }

    /*
    async nlu_structure_name_is_empty(name) {
        return (!name);
    }
    */

    async nlu_structure_id_exists(id) {

        return this.NLUModel.findOne({ id: id })
                            .select("id")
                            .lean()
                            .then(result => {
                                console.log(result);
                                return result != null;
                            });
    }

    async add_nlu_structure (name, text) {

        /*
        if (await this.nlu_structure_name_is_empty(name)) {
            console.log("Error: nombre vacío.");
            throw new ErrorNameIsEmpty();
        }
        */
        
        if (await this.nlu_structure_name_exists(name)){
            console.log("Error: " + name + " ya existe.");
            throw new ErrorNameAlreadyExists(name);
        }
        
        console.log("Estructura nueva, se agrega a la base de datos.");
        const obj = JSON.stringify({name: name, text: text});
        const nlu_structure = new this.NLUModel(JSON.parse(obj));
        nlu_structure.save();
        return nlu_structure;
    }

    async put_nlu_structure (name, text, id) {

        const obj = JSON.stringify({name: name, text: text});
        let nlu_structure = new this.NLUModel(JSON.parse(obj));

        await this.NLUModel.findByIdAndUpdate(id, JSON.parse(obj), {new: true},  function (err, nlu_structure) {
            
            if (err){
                console.log("Error: ", error.response.data.name);
            }
            else{
                console.log("Updated id: ", id);
            }
        });

        return nlu_structure;
    }

    async delete_nlu_structure (id) {

        return this.NLUModel.findByIdAndDelete(id);
    }
}

export default BaseDeDatos;
