import React, {useEffect} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

import {statusBar, styles} from './styles';
import Title from '../../components/base/Title';
import * as appActions from '../../store/app/actions';
import * as appSelector from '../../store/app/selectors';
import {UserSigninRequest} from '../../store/app/types';

const validationSchema = yup.object().shape({
  username: yup.string().required('Required field'),
  password: yup.string().min(8, 'At least 8 characters').required('Required'),
});

export const SigninScreen = () => {
  const dispatch = useDispatch();
  const lastError = useSelector(appSelector.lastErrorSelector);

  const useFormValue = useForm<UserSigninRequest>({
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

  const onSubmit = (data: UserSigninRequest) => {
    dispatch(appActions.signinRequested(data));
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
        style={styles.scrollView}>
        <View style={styles.body}>
          <View>
            <Title>Registrati</Title>
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

            <Button title="Singn Submit" onPress={handleFormSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
