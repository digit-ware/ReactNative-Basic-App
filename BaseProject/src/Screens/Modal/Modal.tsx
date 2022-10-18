/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

import {statusBar, styles} from './styles';

export interface ModalScreenRouteParams {
  modalIndex: number;
}

interface Props {
  navigation: any;
  route: {
    params?: ModalScreenRouteParams;
  };
}

export const _ModalScreen = ({navigation, route}: Props) => {
  const modalIndex = route?.params?.modalIndex ?? 0;
  console.log(modalIndex);

  const onModalPress = useCallback(() => {
    if (modalIndex >= 3) {
      navigation.popToTop();
      navigation.navigate('HomeTabNavigator');
      return;
    }
    // ref actions -> https://reactnavigation.org/docs/navigation-prop/
    const params: ModalScreenRouteParams = {
      modalIndex: modalIndex + 1,
    };
    navigation.push('MyModal', params);
  }, [navigation, modalIndex]);

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
          <Text>HEADER</Text>
          <View style={styles.body}>
            {(() => {
              switch (modalIndex) {
                case 0:
                case 1:
                case 2:
                  return (
                    <Button
                      title={`Present Modal ${modalIndex}`}
                      onPress={onModalPress}
                    />
                  );
                default:
                  return <Button title={'Last Modal'} onPress={onModalPress} />;
              }
            })()}
          </View>
          <Text>FOOTER</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const ModalScreen = React.memo(_ModalScreen);
