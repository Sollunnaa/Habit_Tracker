import { TouchableOpacity ,StyleSheet, Text, View, Dimensions} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useState} from "react";
import AddHabitModal from "./AddHabitModal";

const { width, height } = Dimensions.get('window');

export default function AddHabit({onHabitAdded}:{onHabitAdded: ()=> void}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAdd = async (habitData: {habitName: string; frequency: string; time: string}) => {
    try{
      const response = await fetch("http://10.0.2.2:5000/habit/createHabit",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(habitData),
      });

      if (response.ok){
        console.log("habit added successfully");
        onHabitAdded();
        closeModal();
      } else{
            
          const errorText = await response.text(); // Try to read the response body
          console.error(`❌ Failed to add habit. 
            Status: ${response.status} ${response.statusText}
            Response: ${errorText}`)
      }
      }catch(error){
        console.error("Error adding habit", error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF4545', '#F85DB2']} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>  
          <Text style={styles.buttonText}>Add Habit</Text>
        </LinearGradient>
      </TouchableOpacity>
      <AddHabitModal visible={modalVisible}
      onClose={closeModal}
      onAddHabit={handleAdd}/>
    </View>
    
  );
};

const styles = StyleSheet.create (
  {
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    marginTop: height * 0.01,
    width: width,
  },
   linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
    button: {
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    flexDirection: "row",
    height: height * 0.05,
  },
    buttonText: {
    color: "#fff",
    fontSize: 13,
    marginHorizontal: width * 0.02,
  },
});