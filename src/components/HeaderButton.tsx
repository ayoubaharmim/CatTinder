import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Flame, Star } from "../icons";

export const HeaderButton = () => {
  const [selected, setSelected] = useState<'left' | 'right'>('left');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, selected === 'left' && styles.selectedButton]}
        onPress={() => setSelected('left')}
      >
        <Flame height={15} width={15} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, selected === 'right' && styles.selectedButton]}
        onPress={() => setSelected('right')}
      >
        <Star height={15} width={15} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignSelf: "center",
    marginBottom: 30,
    width: '25%',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    width: '40%',
  },
  selectedButton: {
    backgroundColor: "#E3E3E4",
  },
});
