import React from 'react';
import { TouchableHighlight } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import MapScreen from '../screens/MapScreen/MapScreen';
import UserStories from '../screens/UserStories/UserStories';
import ContactUs from '../screens/ContactUs/ContactUs';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import Profile from '../screens/Profile/Profile';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

const DrawerIcon = ({ navigation }) => (
  <TouchableHighlight
    style={{ alignItems: 'center', justifyContent: 'center', width: 48, height: 48 }}
    underlayColor={'rgba(0, 0, 0, 0)'}
    onPress={() => {
      navigation.navigate('DrawerOpen');
    }}
  >
    <Entypo
      name="menu"
      size={28}
      onPress={() => {
        navigation.navigate('DrawerOpen');
      }}
    />
  </TouchableHighlight>
);

const RegisterScreenStack = StackNavigator(
  {
    First: { screen: RegisterScreen },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const LoginScreenStack = StackNavigator(
  {
    First: { screen: LoginScreen },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
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

const ProfileStack = StackNavigator(
  {
    First: { screen: Profile },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      title: 'Profile',
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
    ProfileScreen: {
      screen: ProfileStack,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => (
          <Entypo
            name="user"
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
    contentOptions: {
      activeTintColor: '#C74246',
    },
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
