import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs';

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
}

export default function HabitSquare({habit}: HabitSquareProp ) {
    return (
        <View style={styles.container}>
            {/* Row 1 - Title + Edit/Delete */}
            <View style={styles.row1}>
                <View style={styles.left}>
                    <View style={styles.checkbox} />
                    <Text style={styles.title}>{habit.habitName}</Text>
                </View>

                <View style={styles.right}>
                    <TouchableOpacity>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.deleteText}>X</Text>
                    </TouchableOpacity>
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
        fontWeight: '600'
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
