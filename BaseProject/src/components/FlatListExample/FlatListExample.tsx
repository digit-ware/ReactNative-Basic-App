import React from 'react';
import {FlatList} from 'react-native';
import Item from './FlatListItem';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Fourth Item 4',
  },
  {
    id: '5',
    title: 'Lorem Ipsum 5',
  },
  {
    id: '6',
    title: 'Lorem Ipsum 6',
  },
  {
    id: '7',
    title: 'Lorem Ipsum 7',
  },
  {
    id: '8',
    title: 'Lorem Ipsum 8',
  },
  {
    id: '9',
    title: 'Lorem Ipsum 9',
  },
];

const FlatListExample = () => {
  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default FlatListExample;
