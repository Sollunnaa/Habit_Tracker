import express from 'express';
import { createHabit, getHabits, getHabitById, editHabit, 
    softDeleteHabit, restoreHabit, hardDeleteHabit } from '../controllers/habitController';

    
const router = express.Router();

router.post('/createHabit', createHabit)
router.get('/getHabits', getHabits)
router.get('/getHabit/:id', getHabitById)

router.put('/editHabit/:id', editHabit)

router.put('/softDeleteHabit/:id', softDeleteHabit)
router.put('/restoreHabit/:id', restoreHabit)

router.delete('/deleteHabit/:id', hardDeleteHabit)

export default router;