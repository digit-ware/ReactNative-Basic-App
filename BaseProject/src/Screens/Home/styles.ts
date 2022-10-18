import {StatusBarStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const statusBar = {
  barStyle: 'dark-content' as StatusBarStyle,
  backgroundColor: Colors.lighter,
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  } as ViewStyle,
  backgroundStyle: {
    backgroundColor: Colors.lighter,
  } as ViewStyle,
  welcomeText: {
    fontSize: 40,
    margin: 16,
    textAlign: 'center',
  } as TextStyle,
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
});
