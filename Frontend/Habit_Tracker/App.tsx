import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View , Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';
import dayjs from 'dayjs'


import ProgressCard from './components/progressBar';
import AddHabit from './components/addHabit';
import HabitSquare from './components/habitSquare';
import { Habit } from './components/habitSquare';
import EditHabitModal from './components/editHabitModal';

const { width, height } = Dimensions.get('window');

export default function App() {

    const [showDeleted, setShowDeleted] = useState(false);
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

    const fetchDeletedHabits = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/habit/isDeleted");
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Error fetching deleted habits:", error);
    }
  };

    const updateHabit = async(id: number, updatedData: Partial<Habit>)=>{
      await fetch(`http://10.0.2.2:5000/habit/editHabit/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedData)
      });

      fetchHabits();
      setEditVisible(false);
    }

    const updateHabitDone = async(id: number, isDone: boolean)=>{
      try{
        await fetch(`http://10.0.2.2:5000/habit/habitIsDone/${id}`,{
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({isDone})
        });

        fetchHabits();
      }catch(error){
        console.error("Error updating habit:", error);
      }
    }

    const softDelete = async(id: number, isDeleted: boolean)=>{
      try{
        await fetch(`http://10.0.2.2:5000/habit/softDeleteHabit/${id}`,{
          method: 'PUT',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({isDeleted})
        });

        fetchHabits();
      }catch(error){
        console.error("Error Deleting ", error)
      }
    }

    const restore = async(id:number, isDeleted: boolean)=>{
      try{
        await fetch(`http://10.0.2.2:5000/habit/restoreHabit/${id}`,{
          method: 'PUT',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({isDeleted})
        })
        fetchDeletedHabits();

      }catch(error){
        console.error("Error Restore", error)
      }
    }

    useEffect(() => {
      if(showDeleted){
        fetchDeletedHabits();
      }else{
        fetchHabits();
      }
    }, [showDeleted]);

    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
    const [editVisible, setEditVisible] = useState(false);

    const handleEditHabit = (habit:Habit)=>{
      setSelectedHabit(habit);
      setEditVisible(true)
    }


    const onHabitAdded = ()=> {
      fetchHabits();
    }

    const total = habits.length;
    const done = habits.filter(habit => habit.isDone).length;
    
    const activeHabits = habits.filter(h => !h.isDeleted);
    const deletedHabits = habits.filter(h => h.isDeleted);

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
          renderItem={({item})=>
          <HabitSquare 
          habit={item} 
          onEdit={handleEditHabit} 
          onToggleDone={updateHabitDone} 
          onSoftDel={softDelete}
          showDeleted={showDeleted}
          onRestore={restore}
          />
        }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <EditHabitModal
        visible={editVisible}
        habit={selectedHabit}
        onClose={()=> setEditVisible(false)}
        onUpdateHabit={updateHabit}
      />
      


      <View style={styles.footer}>
        <AddHabit onHabitAdded={onHabitAdded}/>
        <TouchableOpacity onPress={()=> setShowDeleted(!showDeleted)}>
          <Text>{showDeleted? "Back" : <Image style={styles.trashBin} source={require('./assets/trash.png')}/>}</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    flexDirection: 'row'

  },
  trashBin:{
    width:width*0.06,
    height: height*0.03,
  }
});
