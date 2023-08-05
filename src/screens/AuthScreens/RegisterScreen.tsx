import React from 'react';
import AuthLayout from '../../components/templates/AuthLayout';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {registerStore} from '../../lib/stores/auth';
import {useRegisterMutation} from '../../lib/functions/useAuth';

import {useMutation} from 'convex/react';
import {api} from '../../../convex/_generated/api';

const RegisterScreen = (): JSX.Element => {
  const {
    isLoading,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setIsLoading,
    setDefault,
  } = registerStore();

  const registerMutation = useMutation(api.auth.register);

  const handleRegister = async () => {
    setIsLoading(true);

    useRegisterMutation({
      name,
      email,
      password,
      setDefault,
      registerMutation
    });
  };

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full gap-y-3`}>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Name</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            value={name}
            onChangeText={value => setName(value)}
          />
        </View>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Email</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            keyboardType="email-address"
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm`}>Password</Text>
          <TextInput
            style={tw`w-full px-3 font-dosis rounded-xl border border-neutral-300`}
            secureTextEntry={true}
            value={password}
            onChangeText={value => setPassword(value)}
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
