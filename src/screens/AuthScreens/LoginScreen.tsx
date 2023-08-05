import React from 'react';
import AuthLayout from '../../components/templates/AuthLayout';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {useNavigate} from '../../config/RootNavigation';
import {loginStore} from '../../lib/stores/auth';
import {useLoginMutation} from '../../lib/functions/useAuth';

import {useMutation} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const LoginScreen = (): JSX.Element => {
  const {
    isLoading,
    error,
    email,
    password,
    setEmail,
    setPassword,
    setIsLoading,
    setError,
    setDefault,
  } = loginStore();

  const loginMutation = useMutation(api.auth.login);

  const handleLogin = async () => {
    setIsLoading(true);

    useLoginMutation({
      email,
      password,
      setError,
      setDefault,
      loginMutation,
    });
  };

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full gap-y-3`}>
        {error && (
          <View
            style={tw`flex-row justify-center w-full p-3 rounded-xl bg-red-400`}>
            <Text style={tw`font-dosis text-sm text-white`}>
              {error.toString()}
            </Text>
          </View>
        )}
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw.style(
            'flex-row items-center justify-center w-full p-4 rounded-xl bg-[#222]',
            isLoading && 'opacity-50',
          )}
          onPress={handleLogin}>
          <Text style={tw`font-dosis text-white`}>
            {isLoading ? 'Loading...' : 'Log in'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row items-center justify-center w-full`}>
          <Text style={tw`font-dosis`}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row items-center justify-center w-full p-4 rounded-xl bg-[#474747]`}
          onPress={() => useNavigate('RegisterScreen')}>
          <Text style={tw`font-dosis text-white`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;
