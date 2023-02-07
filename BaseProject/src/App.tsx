/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { SigninScreen } from './Screens/Signin/Signin';
import ChartsScreen from './Screens/Charts';
import HomeScreen from './Screens/Home';
import LoginScreen from './Screens/Login';
import ModalScreen from './Screens/Modal';
import SettingsScreen from './Screens/Settings';
import configureStore from './store';
import * as navigationService from './services/navigationService';

import {
  ColorMode,
  extendTheme,
  NativeBaseProvider,
  useColorModeValue,
} from 'native-base';
import type { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customTheme from './theme/custom';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ unmountOnBlur: true }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Text
                style={{
                  color,
                  fontSize: size,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                🏠
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Text
                style={{
                  color,
                  fontSize: size,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                📊
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: useColorModeValue('#fff', '#000'),
          },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Text
                style={{
                  color,
                  fontSize: size,
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                ⚙️
              </Text>
            );
          },
        }}
      />
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
        <Stack.Screen name="Signin" component={SigninScreen} />
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
  const theme = extendTheme(customTheme);

  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem('@my-app-color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
        <NavigationContainer
          ref={navigator => navigationService.init(navigator)}>
          <MainStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
