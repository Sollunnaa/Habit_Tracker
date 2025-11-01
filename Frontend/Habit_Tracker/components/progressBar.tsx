import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated , Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

type Props = {
  done: number;
  total: number;
};

export default function ProgressCard({ done, total }: Props) {
  const progress = total > 0 ? done / total : 0;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const barWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Today's Progress</Text>
          <Text style={styles.fraction}>
            {done}/{total}
          </Text>
          <View style={styles.barBackground}>
            <Animated.View style={[styles.barFill, { width: barWidth }]} />
          </View>
        </View>

        <View style={styles.circle}>
          <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    width: width * 0.9,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
  fraction: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
  },
  barBackground: {
    height: 5,
    width: width * 0.65,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginTop: 6,
    overflow: "hidden",
  },
  barFill: {
    height: 5,
    borderRadius: 5,
    backgroundColor: "#ff4d79",
  },
  circle: {
    width: width * 0.12,
    height: height * 0.06,
    borderRadius: 25,
    backgroundColor: "#ffe6eb",
    justifyContent: "center",
    alignItems: "center",
  },
  percent: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff4d79",
  },
});
