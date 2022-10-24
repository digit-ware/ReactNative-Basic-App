/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {statusBar, styles} from './styles';
import * as appActions from '../../store/app/actions';

export const SettingsScreen = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(appActions.logoutRequested());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={statusBar.barStyle}
        backgroundColor={statusBar.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <View style={styles.body}>
          <View style={styles.body}>
            <Button title="Logout" onPress={logout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
