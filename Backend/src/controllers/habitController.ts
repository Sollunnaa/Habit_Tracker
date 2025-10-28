import { Request, Response } from 'express';
import db from '../db'
import {habit} from '../db/schema';
import { eq, and } from 'drizzle-orm';

export const createHabit = async (req: Request, res: Response) => {
  try{
    const {habitName, frequency, time} = req.body;
    const newHabit = await db.insert(habit).values({
        habitName,
        frequency,
        time
    }).returning();
    res.status(201).json(newHabit);
  }
  catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to create habit"});
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try{
    const habits = await db.select().from(habit).where(eq(habit.isDeleted, false));
    res.status(200).json(habits);
  }
  catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to fetch habits"});
  }
};

export const getHabitById = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const habitById = await db.select().from(habit).where(and(eq(habit.id, Number(id)), eq(habit.isDeleted, false)));
    if(habitById.length === 0){
        return  res.status(404).json({error: "Habit not found"});
    }
    res.status(200).json(habitById[0]);
  }catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to fetch habit"});
  }
};

export const editHabit = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const {habitName, frequency, time, isDone} = req.body;
    const updatedHabit = await db.update(habit).set({
        habitName,
        frequency,
        time,
        isDone
    }).where(and(eq(habit.id, Number(id)),eq(habit.isDeleted, false))).returning();
    if(updatedHabit.length === 0){
        return res.status(404).json({error: "Habit not found or could not be updated"});
    }
    res.status(200).json(updatedHabit[0]);
  }catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to update habit"});
  }
};

export const softDeleteHabit = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const deletedHabit = await db.update(habit).set({
        isDeleted: true
    }).where(and(eq(habit.id, Number(id)), eq(habit.isDeleted, false))).returning();
    if(deletedHabit.length === 0){
        return res.status(404).json({error: "Habit not found or could not be deleted"});
    }
    res.status(200).json({message: "Habit deleted successfully"});
  }catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to delete habit"});
  }
};

export const restoreHabit = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const restoredHabit = await db.update(habit).set({
        isDeleted: false
    }).where(and(eq(habit.id, Number(id)), eq(habit.isDeleted, true))).returning();
    if(restoredHabit.length === 0){
        return res.status(404).json({error: "Habit not found or could not be restored"});
    }
    res.status(200).json({message: "Habit restored successfully"});
  }catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to restore habit"});
  }
};

export const hardDeleteHabit = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const deletedCount = await db.delete(habit).where(eq(habit.id, Number(id))).returning();
    if(deletedCount.length === 0){
        return res.status(404).json({error: "Habit not found or could not be deleted"});
    }
    res.status(200).json({message: "Habit permanently deleted successfully"});
  }catch (error){
    console.error(error);
    res.status(500).json({error: "Failed to permanently delete habit"});
  }
};

