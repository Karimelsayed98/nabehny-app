import React from 'react';
import { Platform } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import ScreenOne from '../screens/ScreenOne';
import ScreenTwo from '../screens/ScreenTwo';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { Ionicons, Entypo } from '@expo/vector-icons';

const DrawerIcon = ({ navigation }) => (
  <Entypo
    name="menu"
    size={28}
    style={{ marginLeft: 5 }}
    onPress={() => {
      navigation.navigate('DrawerOpen');
    }}
  />
);

const firstScreen = StackNavigator(
  {
    First: { screen: ScreenOne },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      title: 'Home Screen',
    }),
  },
);
const secondScreen = StackNavigator(
  {
    First: { screen: ScreenTwo },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      title: 'Second Screen',
    }),
  },
);

export const DrawerNavigation = DrawerNavigator(
  {
    FirstScreen: {
      screen: firstScreen,
      navigationOptions: {
        drawerLabel: 'Screen 1',
        drawerIcon: ({ tintColor }) => (
          <Ionicons
            name="md-home"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    SecondScreen: {
      screen: secondScreen,
      navigationOptions: {
        drawerLabel: 'Screen 2',
        drawerIcon: ({ tintColor }) => (
          <Ionicons
            name="logo-twitter"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'FirstScreen',
  },
);

export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: DrawerNavigation,
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: 'Register',
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
