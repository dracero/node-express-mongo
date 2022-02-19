import express from "express";
import {
  get_nlu_structure,
  get_nlu_structure_name,
  add_nlu_structure,
  put_nlu_structure,
  delete_nlu_structure
} from '../controllers/NLU_controller.js'

const router = express.Router();

router.get('/nlu_structures', get_nlu_structure);
router.get('/nlu_structure_name', get_nlu_structure_name);
router.post('/nlu_structure', add_nlu_structure);
router.put('/nlu_structure/:id', put_nlu_structure);
router.delete('/nlu_structure/:id', delete_nlu_structure);

export default router