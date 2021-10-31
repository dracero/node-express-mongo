import mongoose from "mongoose";
import NLU from "../models/NLU.js"

/*
function ExcepcionNameAlreadyExists(name) {
    this.name = name;
    this.mensaje = "The name " + name + " already exists";
    this.toString = function() {
       return this.name + this.mensaje
    };
    const error = new Error(this.mensaje);
    return error;
}
*/

class BaseDeDatos {
    
    constructor(){
        this.NLUModel = NLU;
    }

    get_nlu_structure () {
        
        const nlu_structure = this.NLUModel.find({});
        return nlu_structure;
    }

/*    async add_nlu_structure(name, text) {
        const data = await this.findOne({ name: name });
        if (data) {
            console.log("data = ", data);
            throw new ExcepcionNameAlreadyExists(findOne);
        }
        console.log("llega");

        const obj = JSON.stringify({name: name, text: text});
        const nlu_structure = new this.NLUModel(JSON.parse(obj));
        nlu_structure.save();
        return nlu_structure;
    }*/

    add_nlu_structure (name, text) {

        const names = [];
        const data = this.NLUModel.find({name: name}, (err, names) => {
            
            if (err) {
              return;
            }

            if (names.length) {

                console.log("Error: ", name, " ya existe.")

                //throw 'un error';
                //throw new ExcepcionNameAlreadyExists(name);
                return;

            } else {
              //console.log("Estructura nueva, se agrega a la base de datos");
            }
        })


        console.log("llega");

        const obj = JSON.stringify({name: name, text: text});
        const nlu_structure = new this.NLUModel(JSON.parse(obj));
        nlu_structure.save();
        return nlu_structure;
    }

    put_nlu_structure (name, text, id) {
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

    delete_nlu_structure (id) {
        return this.NLUModel.findByIdAndDelete(id);
    }
}

export default BaseDeDatos;
