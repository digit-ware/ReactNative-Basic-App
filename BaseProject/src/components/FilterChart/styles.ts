import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

export const animatedBodyHeight = 200;
export const carretContainerHeight = 24;

export const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    backgroundColor: '#FFF',

    // for shadow look https://ethercreative.github.io/react-native-shadow-generator/
    zIndex: 28,
    // IOS shadow
    shadowColor: 'rgb(197, 41, 120)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 5,
  } as TextStyle,
  filterAction: {
    flexDirection: 'row',
  } as ViewStyle,
  icon: {
    fontSize: 24,
    paddingRight: 16,
  } as TextStyle,
  value: {
    fontSize: 24,
  } as TextStyle,
  carretContainer: {
    height: carretContainerHeight,
  } as ViewStyle,
  carretDown: {
    fontSize: 16,
  } as TextStyle,
  bodyContainer: {
    position: 'relative',
    height: 0,
    width: '100%',
  } as ViewStyle,
  body: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#F0F0F0',
  } as ViewStyle,
});
