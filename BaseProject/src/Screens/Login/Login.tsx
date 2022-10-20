/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import * as appActions from '../../store/app/actions';
import * as appSelector from '../../store/app/selectors';

interface Props {
  navigation: any;
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Required field'),
  password: yup.string().min(8, 'At least 8 characters').required('Required'),
});

export const LoginScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const lastError = useSelector(appSelector.lastErrorSelector);

  const useFormValue = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useFormValue;

  useEffect(() => {
    if (lastError !== null) {
      setError('username', lastError);
    }
  }, [setError, lastError]);

  const onSubmit = async (data: any) => {
    dispatch(appActions.clearError({comment: 'login submitted'}));
    console.log(data);

    const result = await fetch('https://random-data-api.com/api/v2/users');
    if (true) {
      navigation.navigate('HomeTabNavigator');
      const user = await result.json();
      dispatch(
        appActions.loginSucceeded({
          username: user.username,
          token: user.uid,
        }),
      );
    }
    if (false) {
      dispatch(appActions.loginFailed({message: 'Login Failed'}));
    }
  };
  const handleFormSubmit = handleSubmit(onSubmit);

  console.log('errors', errors);

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

            <Button title="Submit" onPress={handleFormSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
