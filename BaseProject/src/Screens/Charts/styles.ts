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

export const electricityStyle = StyleSheet.create({
  labelContainer: {
    marginBottom: 10,
  } as ViewStyle,
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    borderRadius: 5,
    overflow: 'hidden',
    width: 20,
    height: 20,
    marginRight: 15,
  } as ViewStyle,
  tableTitle: {
    marginBottom: 16,
  } as TextStyle,
  tableRow: {
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#eeeff0',
    marginBottom: 5,
  } as ViewStyle,
  callSizeM: {
    width: 75,
  } as ViewStyle,
  callSizeL: {
    width: 150,
  } as ViewStyle,
  tableHeader: {
    backgroundColor: '#eeeff0',
    marginBottom: 12,
  } as ViewStyle,
  headerCell: {
    fontSize: 28,
  } as TextStyle,
  bodyCell: {
    fontSize: 28,
  } as TextStyle,
});
