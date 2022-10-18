/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Header} from 'react-native/Libraries/NewAppScreen';

import {statusBar, styles} from './styles';

interface Props {
  navigation: any;
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup.string().min(8, 'At least 8 characters').required('Required'),
});

export const LoginScreen = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('HomeTabNavigator');
  };
  console.log(errors);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={statusBar.barStyle}
        backgroundColor={statusBar.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Header />
        <View style={styles.body}>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Username:</Text>
                  <TextInput
                    style={styles.inputText}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="username"
            />
            <Text>{errors.username?.message}</Text>
            <View style={styles.spacer} />

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password:</Text>
                  <TextInput
                    style={styles.inputText}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="password"
            />
            <Text>{errors.password?.message}</Text>
            <View style={styles.spacer} />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
