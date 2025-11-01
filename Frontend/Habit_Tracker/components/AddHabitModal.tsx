import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

const { width, height } = Dimensions.get('window');



export default function AddHabitModal({ 
  visible, 
  onClose, 
  onAddHabit }: 
  { visible: boolean; 
    onClose: () => void; 
    onAddHabit: (habitData: {habitName: string, frequency: string; time: string}) => void; }) {
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Twice a Week', value: 'twice_a_week' },
    { label: 'Thrice a Week', value: 'thrice_a_week' },
  ]);
  const [open, setOpen] = useState(false);

   const [habitName, setHabitName] = useState("");
  const [time, setTime] = useState<string>('');
  const [show, setShow] = useState(false);

  const handleAdd = () => {
    if(habitName && value && time) {
        onAddHabit({habitName, frequency: value, time});
        setHabitName("");
        setValue(null);
        setTime("");
        onClose();
    }
    else{
      alert("Please Fill out all Fields before adding Habit")
    }
  }

  const onChange = (event: any, selectedTime?: Date) => {
    setShow(false);
    if (selectedTime) {
      const formatted = selectedTime.toLocaleTimeString([], { hour: '2-digit',
         minute: '2-digit', hour12: true });
      setTime(formatted);
    }
  };

  

 

    return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Habit</Text>
            <TextInput
              style={styles.input}
              placeholder="Habit Name"
                value={habitName}
                onChangeText={setHabitName}
            />
            <DropDownPicker 
            open={open}
            value={value}
            items={items} 
            setOpen={setOpen} 
            setValue={setValue} 
            setItems={setItems} 
            placeholder="Select Frequency" 
            containerStyle={{marginBottom: 15, height: height*0.06, }}
            style={{borderColor: '#ccc',  }}
            multiple={false}/>

            <TouchableOpacity onPress={() => setShow(true)} style={styles.timePicker}>
              <Text style={styles.timePickerText}>{time || 'Pick Time'}</Text>
            </TouchableOpacity>

            {show && (
            <DateTimePicker
              value={new Date()} // default to current time
              mode="time"
              is24Hour={false} // set true for 24-hour format
              display="default"
              onChange={onChange}
              accentColor="#FFE9EB"

              />
             )}

            <TouchableOpacity
              style={styles.addButton}
                onPress={handleAdd}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF4545', '#F85DB2']} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Habit</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: width * 0.9,
    },
    modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    },
    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    },
    addButton: {
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    height: height * 0.05,
    justifyContent: "center",
    width: width * 0.8,
    },
    addButtonText: {
    color: "#fff",
    fontSize: 15,
    },  
    cancelButton: {
    marginTop: 10,
    alignItems: "center",
    },
    cancelButtonText: {
    color: "#ff4d79",
    fontSize: 16,
    },
    timePicker: {
    marginBottom: height * 0.01,
    alignItems: "flex-start",
    borderWidth: 0.5,
    borderColor: "#555",
    padding: width *0.02,
    borderRadius: 8,
    height: height * 0.05,
    justifyContent: "center",
    },
    timePickerText: {
    fontSize: 14,
    color: "#555",
    },
});
