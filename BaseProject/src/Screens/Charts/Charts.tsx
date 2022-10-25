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
      <FilterChart style={styles.paddedHorizontal} />
      <View style={styles.body}>
        <Title>I tuoi consumi</Title>
        <Chart
          data={[
            {label: 'New Jersey', y: 19034.5},
            {label: 'Texas', y: 20015},
            {label: 'Oregon', y: 25342},
            {label: 'Montana', y: 20088},
            {label: 'Massachusetts', y: 28234},
          ]}
        />
      </View>
    </SafeAreaView>
  );
};
