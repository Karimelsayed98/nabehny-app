import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import MapScreen from '../screens/MapScreen/MapScreen';
import UserStories from '../screens/UserStories/UserStories';
import ContactUs from '../screens/ContactUs/ContactUs';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

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

const MapScreenStack = StackNavigator(
  {
    First: { screen: MapScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      title: 'Map',
    }),
  },
);
const UserStoriesStack = StackNavigator(
  {
    First: { screen: UserStories },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      title: 'User Stories',
    }),
  },
);

const ContactUsStack = StackNavigator(
  {
    First: { screen: ContactUs },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      title: 'Contact Us',
    }),
  },
);

export const DrawerNavigation = DrawerNavigator(
  {
    MapScreen: {
      screen: MapScreenStack,
      navigationOptions: {
        drawerLabel: 'Map',
        drawerIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-map"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    UserStories: {
      screen: UserStoriesStack,
      navigationOptions: {
        drawerLabel: 'User Stories',
        drawerIcon: ({ tintColor }) => (
          <FontAwesome
            name="feed"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    ContactUs: {
      screen: ContactUsStack,
      navigationOptions: {
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-mail"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'MapScreen',
  },
);

export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: DrawerNavigation,
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: 'Register',
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
