import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Paw, Profile, Chat } from '../icons';

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BottomMenu = () => {
  const navigation = useNavigation<NavigationProp>();
  const state = navigation.getState();
  const currentRoute = state?.routes[state.index]?.name;

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.menuItem}
      >
        <Paw color={currentRoute === 'Home' ? "#EC537E" : "#434141"} height={20} width={20}/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.menuItem}
      >
        <Chat color={currentRoute === 'Chat' ? "#EC537E" : "#434141"} height={20} width={20}/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.menuItem}
      >
        <Profile color={currentRoute === 'Profile' ? "#EC537E" : "#434141"} height={20} width={20}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginBottom: 30,
    },
    menuItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 16,
        color: '#888888',
    },
    activeMenuText: {
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
});