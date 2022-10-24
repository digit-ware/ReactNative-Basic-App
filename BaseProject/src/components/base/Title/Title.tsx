import React from 'react';
import {Text, TextProps} from 'react-native';
import {styles} from './styles';

interface Props extends TextProps {}

export const _Title = (props: Props) => {
  return <Text {...props} style={[styles.root, props.style]} />;
};

export const Title = React.memo(_Title);
