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

import {statusBar, styles} from './styles';

interface Props {
  navigation: any;
}

export const SettingsScreen = ({navigation}: Props) => {
  const logout = useCallback(() => {
    // ref actions -> https://reactnavigation.org/docs/navigation-prop/
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }, [navigation]);
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
