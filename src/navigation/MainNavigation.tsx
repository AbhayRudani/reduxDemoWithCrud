import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import {routes} from '../helper/stringsConstant';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}
        initialRouteName={routes.HomeScreen}>
        <Stack.Screen name={routes.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={routes.SearchScreen} component={SearchScreen} />
        <Stack.Screen
          name={routes.ItemDetailsScreen}
          component={ItemDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
