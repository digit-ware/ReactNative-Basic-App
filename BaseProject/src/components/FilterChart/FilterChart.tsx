import React, {useCallback, useMemo, useState} from 'react';
import {Animated, Easing, Text, TextProps, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Padder from '../base/Padder';
import {animatedBodyHeight, carretContainerHeight, styles} from './styles';

interface Props extends TextProps {
  style?: ViewStyle;
}

export const _FilterChart = ({style}: Props) => {
  const [menuOpened, setMenuOpened] = useState(false);
  // NOTE: useMemo needed to avoid changes on nimated.Value
  // otherwise the animation would have unattended behaviour
  const animatedMenuValue = useMemo(() => new Animated.Value(0), []);

  // never recomputed callbacks (both openMenu and closeMenu).
  // animatedMenuValue is memoized for the full component lifecicle
  // also setMenuOpened never changes (is the callback of setState)
  const openMenu = useCallback(() => {
    Animated.timing(animatedMenuValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setMenuOpened(true);
    });
  }, [animatedMenuValue]);
  const closeMenu = useCallback(() => {
    Animated.timing(animatedMenuValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setMenuOpened(false);
    });
  }, [animatedMenuValue]);

  const bodyAnimatedHeight = useMemo(
    () => ({
      height: animatedMenuValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, animatedBodyHeight],
      }),
    }),
    [animatedMenuValue],
  );
  const carretAnimatedRotation = useMemo(
    () => ({
      transform: [
        {
          rotate: animatedMenuValue.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: ['0deg', '180deg', '180deg'],
          }),
        },
        {
          translateY: animatedMenuValue.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [
              0,
              carretContainerHeight / 4,
              carretContainerHeight / 4,
            ],
          }),
        },
      ],
    }),
    [animatedMenuValue],
  );

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={menuOpened ? closeMenu : openMenu}>
        <View style={[styles.filterAction, style]}>
          <Text style={styles.icon}>🗂</Text>
          <Text style={styles.value}>Casa al mare</Text>
          <Padder />
          <Animated.View
            style={[styles.carretContainer, carretAnimatedRotation]}>
            <Text style={styles.carretDown}>▼</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
      <View style={styles.bodyContainer}>
        <Animated.View style={[styles.body, bodyAnimatedHeight]}>
          <Text style={{fontSize: 40}}>TEST</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export const FilterChart = React.memo(_FilterChart);
