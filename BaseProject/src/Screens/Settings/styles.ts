import { StatusBarStyle, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const statusBar = {
  barStyle: 'dark-content' as StatusBarStyle,
  backgroundColor: Colors.lighter,
};

export const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  } as ViewStyle,
});
