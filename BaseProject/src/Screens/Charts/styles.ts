import {StatusBarStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const statusBar = {
  barStyle: 'dark-content' as StatusBarStyle,
  backgroundColor: Colors.lighter,
};

export const styles = StyleSheet.create({
  paddedHorizontal: {
    paddingHorizontal: 20,
  } as ViewStyle,
  backgroundStyle: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  } as ViewStyle,
  body: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  } as ViewStyle,
});
