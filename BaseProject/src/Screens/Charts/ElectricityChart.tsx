import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';
// @ts-ignore as "VoronoiHelpers" is exported. Only the typecheck seems to be not aligned.
import {VoronoiHelpers} from 'victory-voronoi-container';

import {electricityStyle as styles} from './styles';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import Title from '../../components/base/Title';

export interface ElectricityConsumption {
  month: string;
  period: string;
  f1: number;
  f2: number;
  f3: number;
}

interface Props {
  data: ElectricityConsumption[];
  sortedMonths: string[];
  chartWidth: number;
}

class PatchedVictoryVoronoiContainer extends VictoryVoronoiContainer {
  static defaultEvents = props => {
    return [
      {
        target: 'parent',
        eventHandlers: {
          onTouchStart: (evt, targetProps) => {
            const result = props.disable
              ? {}
              : VoronoiHelpers.onMouseMove(evt, targetProps);
            return result.reduce((acc: unknown[], handler) => {
              if (typeof handler.eventKey === 'number') {
                acc.push(
                  {
                    ...handler,
                    childName: 'stack-bar-F1',
                  },
                  {
                    ...handler,
                    childName: 'stack-bar-F2',
                  },
                  {
                    ...handler,
                    childName: 'stack-bar-F3',
                  },
                );
              } else {
                acc.push(handler);
              }
              return acc;
            }, []);
            // return props.disable ? {} : VoronoiHelpers.onMouseMove(evt, targetProps)
          },
          onTouchMove: (evt, targetProps) => {
            const result = props.disable
              ? {}
              : VoronoiHelpers.onMouseMove(evt, targetProps);
            return result.reduce((acc: unknown[], handler) => {
              if (typeof handler.eventKey === 'number') {
                acc.push(
                  {
                    ...handler,
                    childName: 'stack-bar-F1',
                  },
                  {
                    ...handler,
                    childName: 'stack-bar-F2',
                  },
                  {
                    ...handler,
                    childName: 'stack-bar-F3',
                  },
                );
              } else {
                acc.push(handler);
              }
              return acc;
            }, []);
            // return props.disable ? {} : VoronoiHelpers.onMouseMove(evt, targetProps)
          },
          onTouchEnd: (evt, targetProps) => {
            // return props.disable ? {} : VoronoiHelpers.onMouseLeave(evt, targetProps)
          },
        },
      },
      {
        target: 'data',
        eventHandlers: props.disable
          ? {}
          : {
              onTouchStart: () => null,
              onTouchMove: () => null,
              onTouchEnd: () => null,
            },
      },
    ];
  };
}

export const ElectricityChart: React.FC<Props> = ({
  data,
  sortedMonths,
  chartWidth,
}) => {
  const noData = data.length === 0;
  const getValues = (key: string) => {
    return data.map(item => {
      const output = {};
      output.y = item[key];
      return {
        y: item[key],
        x: item.month,
        total: item.f1 + item.f2 + item.f3,
      };
    });
  };

  if (!chartWidth) {
    return null;
  }

  return (
    <>
      <ScrollView horizontal>
        <VictoryChart
          width={chartWidth}
          padding={{top: 40, left: 0, right: 0, bottom: 40}}
          domainPadding={240 / data.length}
          containerComponent={
            <PatchedVictoryVoronoiContainer
              labels={({datum}) =>
                datum.total > 0 ? `Consumi mese ${datum.total}` : ''
              }
              labelComponent={
                <VictoryTooltip
                  cornerRadius={5}
                  constrainToVisibleArea
                  centerOffset={{x: 15}}
                  dx={3}
                  flyoutPadding={{top: 5, bottom: 5, left: 15, right: 15}}
                  flyoutStyle={{
                    stroke: '#ccc',
                    strokeOpacity: 0.2,
                    strokeWidth: 3,
                    fill: '#FFFFFF',
                  }}
                  pointerWidth={20}
                  pointerLength={20}
                  style={[
                    {
                      textAnchor: 'start',
                      fontSize: 17,
                      fill: '#4d5468',
                    },
                    {
                      textAnchor: 'start',
                      fontSize: 20,
                      fill: '#020b28',
                    },
                  ]}
                />
              }
            />
          }>
          <Defs>
            <LinearGradient id="gradientF1" x1="0%" x2="100%" y1="0%" y2="0%">
              <Stop offset="0%" stopColor={'#a8b0c4'} />
              <Stop offset="100%" stopColor={'#6f7891'} />
            </LinearGradient>
            <LinearGradient id="gradientF2" x1="0%" x2="100%" y1="0%" y2="0%">
              <Stop offset="0%" stopColor={'#516593'} />
              <Stop offset="100%" stopColor={'##28355a'} />
            </LinearGradient>
            <LinearGradient id="gradientF3" x1="0%" x2="100%" y1="0%" y2="0%">
              <Stop offset="0%" stopColor={'#15316f'} />
              <Stop offset="100%" stopColor={'#000b28'} />
            </LinearGradient>
          </Defs>
          {!noData && [
            <VictoryStack
              key="bars"
              colorScale={[
                'url(#gradientF1)',
                'url(#gradientF2)',
                'url(#gradientF3)',
              ]}
              style={{
                data: {
                  width: data.length > 12 ? 17 : 200 / data.length,
                  paddingLeft: 12,
                  stroke: ({active}) => (active ? '#e5003f' : 'transparent'),
                  strokeWidth: ({active}) => (active ? 2 : 0),
                },
              }}>
              <VictoryBar data={getValues('f1')} name="stack-bar-F1" />
              <VictoryBar data={getValues('f2')} name="stack-bar-F2" />
              <VictoryBar
                data={getValues('f3')}
                name="stack-bar-F3"
                cornerRadius={{topLeft: 3, topRight: 3}}
              />
            </VictoryStack>,
            <VictoryAxis
              key="Xaxis"
              tickCount={data.length}
              tickValues={sortedMonths}
              tickFormat={value => `${value}`.toUpperCase()}
              style={{
                axis: {stroke: '#ccced4', strokeWidth: 2},
                ticks: {stroke: '#2d2d2d', size: 3},
                tickLabels: {
                  stroke: '#2d2d2d',
                  fontSize: 10,
                  strokeWidth: 0.1,
                  angle: 45,
                  padding: 15,
                },
              }}
            />,
          ]}
        </VictoryChart>
      </ScrollView>

      <View style={[styles.label, styles.labelContainer]}>
        <View style={styles.label}>
          <Svg style={styles.box} viewBox="0 0 20 20">
            <Defs>
              <LinearGradient id="gradientF1" x1="0%" x2="100%" y1="0%" y2="0%">
                <Stop offset="0%" stopColor={'##a8b0c4'} />
                <Stop offset="100%" stopColor={'#6f7891'} />
              </LinearGradient>
            </Defs>
            <Rect width="20" height="20" fill="url(#gradientF1)" />
          </Svg>
          <Title>F1</Title>
        </View>
        <View style={styles.label}>
          <Svg style={styles.box} viewBox="0 0 20 20">
            <Defs>
              <LinearGradient id="gradientF2" x1="0%" x2="100%" y1="0%" y2="0%">
                <Stop offset="0%" stopColor={'#516593'} />
                <Stop offset="100%" stopColor={'##28355a'} />
              </LinearGradient>
            </Defs>
            <Rect width="20" height="20" fill="url(#gradientF2)" />
          </Svg>
          <Title>F2</Title>
        </View>
        <View style={styles.label}>
          <Svg style={styles.box} viewBox="0 0 20 20">
            <Defs>
              <LinearGradient id="gradientF3" x1="0%" x2="100%" y1="0%" y2="0%">
                <Stop offset="0%" stopColor={'#15316f'} />
                <Stop offset="100%" stopColor={'#000b28'} />
              </LinearGradient>
            </Defs>
            <Rect width="20" height="20" fill="url(#gradientF3)" />
          </Svg>
          <Title>F3</Title>
        </View>
      </View>
    </>
  );
};
