import {yupResolver} from '@hookform/resolvers/yup';
import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useEffect} from 'react';
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
import * as yup from 'yup';

import {Header} from 'react-native/Libraries/NewAppScreen';

import {statusBar, styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import * as appActions from '../../store/app/actions';
import * as appSelector from '../../store/app/selectors';
import {RememberMe, UserLoginRequest} from '../../store/app/types';
import {navigate} from '../../services/navigationService';

type FormShape = UserLoginRequest & RememberMe;

const validationSchema = yup.object().shape({
  username: yup.string().required('Required field'),
  password: yup.string().min(8, 'At least 8 characters').required('Required'),
  rememberMe: yup.boolean().required(),
});

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const lastError = useSelector(appSelector.lastErrorSelector);

  const useFormValue = useForm<FormShape>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
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

  const onSubmit = (data: FormShape) => {
    const {rememberMe, ...loginRequestedData} = data;
    dispatch(appActions.loginRequested(loginRequestedData, {rememberMe}));
  };
  const handleFormSubmit = handleSubmit(onSubmit);
  const handleSignin = useCallback(() => {
    navigate('Signin');
  }, []);

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

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({field: {onChange, value}}) => (
                <View style={[styles.inputContainer, styles.rowStretched]}>
                  <Text style={styles.inputLabel}>Remember me:</Text>
                  <CheckBox
                    boxType="square"
                    value={value}
                    onValueChange={onChange}
                  />
                </View>
              )}
              name="rememberMe"
            />
            <Text>{errors.password?.message}</Text>
            <View style={styles.spacer} />

            <Button title="Submit" onPress={handleFormSubmit} />
            <View style={styles.hr} />
            <Button title="Signin" onPress={handleSignin} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
