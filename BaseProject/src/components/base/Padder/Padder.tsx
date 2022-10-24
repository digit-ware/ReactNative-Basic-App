import React from 'react';
import {View, ViewProps} from 'react-native';
import {styles} from './styles';

interface Props extends ViewProps {}

export const _Padder = (props: Props) => {
  return <View {...props} style={[styles.root, props.style]} />;
};

export const Padder = React.memo(_Padder);
