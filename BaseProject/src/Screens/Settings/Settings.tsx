/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import { statusBar, styles } from './styles';
import * as appActions from '../../store/app/actions';
import {
  useColorMode,
  useColorModeValue,
  Box,
  Button,
  VStack,
} from 'native-base';

export const SettingsScreen = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(appActions.logoutRequested());
  }, [dispatch]);

  const { toggleColorMode } = useColorMode();
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={statusBar.barStyle}
        backgroundColor={statusBar.backgroundColor}
      />
      <Box p={2} flex={1} bg={useColorModeValue('warmGray.50', 'coolGray.800')}>
        <ScrollView
          style={styles.backgroundStyle}
          contentInsetAdjustmentBehavior="automatic">
          <VStack space={30}>
            <Button variant="solid" onPress={toggleColorMode}>
              {useColorModeValue('Light', 'Dark')}
            </Button>
            <Button variant="subtle" onPress={logout}>
              Logout
            </Button>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
