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
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {ModalScreenRouteParams} from '../Modal';

import {statusBar, styles} from './styles';

interface Props {
  navigation: any;
}

export const HomeScreen = ({navigation}: Props) => {
  const presentAModal = useCallback(() => {
    const params: ModalScreenRouteParams = {
      modalIndex: 0,
    };
    navigation.navigate('MyModal', params);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={statusBar.barStyle}
        backgroundColor={statusBar.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Text style={styles.welcomeText}>Welcome to Home</Text>
        <View style={styles.body}>
          <Button title="Present a Modal" onPress={presentAModal} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
