import BaseDeDatos from "../dao/BaseDeDatos.js";
let baseDeDatos = new BaseDeDatos();

const get_nlu_structure = async (req, res, next) => {
    const nlu_structure = await baseDeDatos.get_nlu_structure();
  
    try {
        res.send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

const add_nlu_structure = async (req, res, next) => {
    try {
        const nlu_structure = await baseDeDatos.add_nlu_structure(req.query.name, req.query.text)
        res.send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

const put_nlu_structure = async (req, res, next) => {

    try {
        const nlu_structure = await baseDeDatos.put_nlu_structure(req.query.name, req.query.text, req.query.id);
        res.send(nlu_structure);
      } catch (error) {
        res.status(500).send(error);
    }
}
  
const delete_nlu_structure = async (req, res, next) => {
      try {
        const nlu_structure = await baseDeDatos.delete_nlu_structure(req.params.id);
    
        if (!nlu_structure) res.status(404).send("No item found");
        res.status(200).send(nlu_structure);
      } catch (error) {
        res.status(500).send(error);
      }
}

export {
    get_nlu_structure,
    add_nlu_structure,
    put_nlu_structure,
    delete_nlu_structure
}
