/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import HomeScreen from './Screens/Home';
import LoginScreen from './Screens/Login';
import SettingsScreen from './Screens/Settings';
import ModalScreen from './Screens/Modal';
import {Provider} from 'react-redux';
import configureStore from './store';
import * as navigationService from './navigationService';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Text
                style={{
                  color,
                  fontSize: size,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                H
              </Text>
            );
          },
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(197, 43, 123)',
          },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="HomeTabNavigator"
          component={HomeTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="MyModal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigator => navigationService.init(navigator)}>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
