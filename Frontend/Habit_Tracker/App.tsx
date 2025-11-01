import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View , Dimensions, FlatList} from 'react-native';
import dayjs from 'dayjs'


import ProgressCard from './components/progressBar';
import AddHabit from './components/addHabit';
import HabitSquare from './components/habitSquare';
import { Habit } from './components/habitSquare';


const { width, height } = Dimensions.get('window');

export default function App() {


    const [doneCount, setDoneCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const [habits, setHabits] = useState<Habit[]>([]);

    const fetchHabits = async () => {
          try {
              const habitResponse = await fetch('http://10.0.2.2:5000/habit/getHabits');
              const habitData = await habitResponse.json();
          
              const doneHabits = await fetch('http://10.0.2.2:5000/habit/getDoneHabits');
              const doneHabitData = await doneHabits.json();
          
              setDoneCount(doneHabitData.length);
              setHabits(habitData);
          } catch (error) {
              console.error('Error fetching habits:', error);
          } finally {
              setLoading(false);
          }
        };

   
    useEffect(() => {
        fetchHabits();
    }, []);


    const onHabitAdded = ()=> {
      fetchHabits();
    }
    const total = habits.length;
    const done = habits.filter(habit => habit.isDone).length;

    const hour = dayjs().hour();
     let greeting = "Hello";
        if (hour >= 5 && hour < 12) {
            greeting = "Good Morning";
        } else if (hour >= 12 && hour < 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Habit Tracker</Text>
        <Text style={styles.headerGreet}>{greeting}</Text>
      </View>
      
      <View style={styles.body}>
        <ProgressCard done={done} total={total}/>
      </View>
      


      <View style={styles.listContainer}>
        <FlatList
          data={habits}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=><HabitSquare habit={item}/>}
          showsVerticalScrollIndicator={false}
        />
      </View>
        
      


      <View style={styles.footer}>
        <AddHabit onHabitAdded={onHabitAdded}/>
      </View>
      
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: width * 0.05,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: height * 0.04,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  headerGreet: {
    fontSize: 18,
    color: '#555',

  },
  body: {
    alignItems: 'center'  

  },
  listContainer:{
    width: "100%",
    marginTop: height * 0.02,
    height: height * 0.55,
    alignItems: 'center'
  },
  footer:{
    alignItems: 'center'
  },
});
