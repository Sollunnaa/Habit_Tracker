import express from 'express';
import { createHabit, getHabits, getHabitById, editHabit, 
    softDeleteHabit, restoreHabit, hardDeleteHabit, getDoneHabits, 
    isDoneHabit,
    revertIsDone,
    getSoftDelHabits} from '../controllers/habitController';

    
const router = express.Router();

router.post('/createHabit', createHabit)
router.get('/getHabits', getHabits)
router.get('/getHabit/:id', getHabitById)
router.get('/getDoneHabits', getDoneHabits)
router.get('/isDeleted', getSoftDelHabits)

router.put('/editHabit/:id', editHabit)
router.put('/habitIsDone/:id', isDoneHabit)
router.put('/revertIsDone/:id', revertIsDone)

router.put('/softDeleteHabit/:id', softDeleteHabit)
router.put('/restoreHabit/:id', restoreHabit)

router.delete('/deleteHabit/:id', hardDeleteHabit)

export default router;