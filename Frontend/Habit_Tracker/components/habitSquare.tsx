import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs';
import EditHabitModal from './editHabitModal';
import {Checkbox} from 'expo-checkbox'

const { width } = Dimensions.get('window');

export type Habit={
    id: number;
    habitName: string;
    frequency: string; // example: "daily", "weekly"
    time: string; // stored as text in your DB
    dateCreated: string; // timestamp
    isDone: boolean;
    isDeleted: boolean;
};

type HabitSquareProp = {
    habit: Habit;
    onEdit: (habit: Habit) => void;
    onToggleDone: (id: number, isDone: boolean) => void;
    onSoftDel: (id: number, isDelete: boolean) => void;
    showDeleted: boolean;
    onRestore:(id: number, isDelete: boolean) => void;
}



export default function HabitSquare({habit, onEdit, onToggleDone, onSoftDel, showDeleted, onRestore}: HabitSquareProp ) {
    const [isChecked ,setChecked] = useState(false);
    const [isDel, setDel] = useState(false);

    const handleToggle = (newValue : boolean) => {
        setChecked(newValue);
        onToggleDone(habit.id, newValue);

    }


   

    return (
        <View style={styles.container}>
            {/* Row 1 - Title + Edit/Delete */}
            <View style={styles.row1}>
                <View style={styles.left}>
                    <Checkbox style={styles.checkbox} 
                    value={isChecked} 
                    onValueChange={handleToggle} 
                    color={isChecked?'#ff4d79' : undefined}/>
                    <Text style={[styles.title, habit.isDone && {textDecorationLine: "line-through", color: "#888"}]}>{habit.habitName}</Text>
                </View>

                <View style={styles.right}>
                    {!showDeleted ? (
                        <>
                        <TouchableOpacity onPress={()=> onEdit(habit)} >
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> onSoftDel(habit.id,true)}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                        </>
                        
                    ): (
                        <TouchableOpacity onPress={()=> onRestore(habit.id, false)}>
                            <Text style={styles.deleteText}>Restore</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
           

            {/* Row 2 - Icons for Daily and Time */}
            <View style={styles.row2}>
                <View style={styles.smallItem}>
                    <View style={styles.smallCheckbox} />
                    <Text style={styles.smallText}>{habit.frequency}</Text>
                </View>

                <View style={styles.smallItem}>
                    <View style={styles.smallCheckbox} />
                    <Text style={styles.smallText}>{habit.time}</Text>
                </View>
            </View>

            {/* Row 3 - Created On */}
            <View style={styles.row3}>
                <Text style={styles.createdText}>{dayjs(habit.dateCreated).format("MMM DD, YYYY")}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        marginVertical: 10
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row2: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 15
    },
    row3: {
        marginTop: 8
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#aaa',
        marginRight: 8
    },
    smallCheckbox: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderColor: '#aaa',
        marginRight: 4
    },
    smallItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        
    },
    smallText: {
        fontSize: 12,
        color: '#777'
    },
    editText: {
        fontSize: 14,
        color: '#555'
    },
    deleteText: {
        fontSize: 14,
        color: '#aaa'
    },
    createdText: {
        fontSize: 11,
        color: '#bbb'
    }
});
