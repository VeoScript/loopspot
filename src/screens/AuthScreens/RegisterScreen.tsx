import React from 'react';
import AuthLayout from '../../components/templates/AuthLayout';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {useGoBack} from '../../config/RootNavigation';
import {useBackHandler} from '../../lib/hooks/useBackHandler';
import {registerStore} from '../../lib/stores/auth';
import {useRegisterMutation} from '../../lib/functions/useAuth';

import {useMutation} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const RegisterScreen = (): JSX.Element => {
  const {
    isLoading,
    error,
    name,
    email,
    password,
    repassword,
    setName,
    setEmail,
    setPassword,
    setRepassword,
    setIsLoading,
    setError,
    setDefault,
  } = registerStore();

  const registerMutation = useMutation(api.auth.register);

  const handleRegister = async () => {
    setIsLoading(true);

    useRegisterMutation({
      name,
      email,
      password,
      repassword,
      setError,
      setIsLoading,
      setDefault,
      registerMutation,
    });
  };

  console.log("error", error)

  useBackHandler(() => {
    setDefault();
    useGoBack();
  });

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full gap-y-3`}>
        {error && (
          <View
            style={tw`flex-row justify-center w-full p-3 rounded-xl bg-red-400`}>
            <Text style={tw`font-dosis text-xs text-white`}>
              {error}
            </Text>
          </View>
        )}
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Name</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            value={name}
            onChangeText={value => {
              setName(value);
              setError('');
            }}
          />
        </View>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Email</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            keyboardType="email-address"
            value={email}
            onChangeText={value => {
              setEmail(value);
              setError('');
            }}
          />
        </View>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Password</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            secureTextEntry={true}
            value={password}
            onChangeText={value => {
              setPassword(value);
              setError('');
            }}
          />
        </View>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Re-enter password</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            secureTextEntry={true}
            value={repassword}
            onChangeText={value => {
              setRepassword(value);
              setError('');
            }}
          />
        </View>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.5}
          style={tw.style(
            'flex-row items-center justify-center w-full p-4 rounded-xl bg-[#222]',
            isLoading && 'opacity-50',
          )}
          onPress={handleRegister}>
          <Text style={tw`font-dosis text-white`}>
            {isLoading ? 'Loading...' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default RegisterScreen;
