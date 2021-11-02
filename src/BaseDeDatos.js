import mongoose from "mongoose";
import NLU from "../models/NLU.js"

class ErrorNameAlreadyExists extends Error {
    
    constructor(name) {
        
        super();
        this.name = 'Error: ' + name + ' ya existe.';
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
    
    async add_nlu_structure (name, text) {

        let alreadyExists;

        await this.NLUModel.findOne({ name: name }).select("name").lean().then(result => {
                
            if (result) {
                console.log("Error: " + name + " ya existe.");
                alreadyExists = true;
                return;

            } else {

                console.log("Estructura nueva, se agrega a la base de datos.");
                alreadyExists = false;                
                const obj = JSON.stringify({name: name, text: text});
                const nlu_structure = new this.NLUModel(JSON.parse(obj));
                nlu_structure.save();
                return nlu_structure;
            }
        });

        if(alreadyExists) {

            throw new ErrorNameAlreadyExists(name);
        }
    }

    async put_nlu_structure (name, text, id) {
        const obj = JSON.stringify({name: name, text: text});
        let nlu_structure = new this.NLUModel(JSON.parse(obj));
        
        const model = "model";
        
        this.NLUModel.findByIdAndUpdate(id, JSON.parse(obj), {new: true},  function (err, nlu_structure) {
            if (err){
                console.log(err)
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
