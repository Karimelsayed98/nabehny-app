import { DrawerNavigator } from 'react-navigation';
import ScreenOne from '../screens/ScreenOne';
import ScreenTwo from '../screens/ScreenTwo';

const DrawerNavigation = DrawerNavigator(
  {
    First: { screen: ScreenOne },
    Second: { screen: ScreenTwo },
  },
  {
    initialRouteName: 'First',
  },
);

export default DrawerNavigation;
