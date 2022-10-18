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
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

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

const _MemoButtonIndex = (props: any) => {
  console.log('_MemoButtonIndex');
  return <Button {...props} />;
};
export const MemoButtonIndex = React.memo(_MemoButtonIndex);

const _MemoButtonBool = (props: any) => {
  console.log('_MemoButtonBool');
  return <Button {...props} />;
};
const MemoButtonBool = React.memo(_MemoButtonBool);



export const ModalScreen = ({navigation, route}: Props) => {
  const modalIndex = route?.params?.modalIndex ?? 0;
  console.log(modalIndex);

  const [stateIndex, setStateIndex] = useState<number>(0);
  const [stateBool, setStateBool] = useState<boolean>(false);

  const onModalIndexPress = useCallback(() => {
    setStateIndex(stateIndex + 1);
  }, [stateIndex]);

  const onModalBoolPress = () => {
    setStateBool(!stateBool);
  };

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
            <MemoButtonIndex
              title={`Modal Index ${stateIndex}`}
              onPress={onModalIndexPress}
            />
            <MemoButtonBool
              title={`Modal Bool ${JSON.stringify(stateBool)}`}
              onPress={onModalBoolPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
