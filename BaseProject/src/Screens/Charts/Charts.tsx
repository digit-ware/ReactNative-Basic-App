import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

import {statusBar, styles} from './styles';
import Title from '../../components/base/Title';
import FilterChart from '../../components/FilterChart';
import Chart from '../../components/Chart';
// import * as chartsActions from '../../store/charts/actions';
// import * as chartsSelector from '../../store/charts/selectors';

export const ChartsScreen = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={statusBar.barStyle}
        backgroundColor={statusBar.backgroundColor}
      />
      <FilterChart style={styles.paddedHorizontal}/>
      <View style={styles.body}>
        <Title>I tuoi consumi</Title>
        <Chart />
      </View>
    </SafeAreaView>
  );
};
