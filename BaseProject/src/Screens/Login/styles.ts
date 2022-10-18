import {StatusBarStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const statusBar = {
  barStyle: 'dark-content' as StatusBarStyle,
  backgroundColor: Colors.lighter,
};

export const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: Colors.lighter,
  } as ViewStyle,
  body: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  } as ViewStyle,
  inputContainer: {
    marginBottom: 16,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 8,
  } as ViewStyle,
  inputLabel: {
    fontSize: 18,
  } as TextStyle,
  inputText: {
    fontSize: 21,
  } as TextStyle,
});
