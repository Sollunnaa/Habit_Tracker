import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

interface Habit {
  id: number;
  habitName: string;
  frequency: string;
  time: string;
  dateCreated: string;
  isDone: boolean;
  isDeleted: boolean;
}

export default function DeletedHabitsScreen({ navigation }: any) {
  const [deletedHabits, setDeletedHabits] = useState<Habit[]>([]);

  const fetchDeletedHabits = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/habit/isDeleted");
      const data = await response.json();
      setDeletedHabits(data);
    } catch (error) {
      console.error("Error fetching deleted habits:", error);
    }
  };

  useEffect(() => {
    fetchDeletedHabits();
  }, []);

  const restoreHabit = async (id: number) => {
    try {
      await fetch(`http://10.0.2.2:5000/habit/restoreHabit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: false }),
      });
      fetchDeletedHabits();
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item }: { item: Habit }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.habitName}</Text>
      <TouchableOpacity onPress={() => restoreHabit(item.id)}>
        <Text style={styles.restore}>Restore</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deleted Habits</Text>

      <FlatList
        data={deletedHabits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nothing here ✅</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    marginVertical: 10,
  },
  card: {
    width: width * 0.9,
    padding: 14,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  restore: {
    color: "#0095FF",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#aaa",
  },
});
