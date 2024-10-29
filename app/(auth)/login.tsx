import React, { useState } from 'react';
import { Alert, StyleSheet, View, AppState, TextInput, Text } from 'react-native';
import CButton from '~/components/CButton';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6">
      {/* Header */}
      <Text className="mb-8 text-3xl font-bold text-gray-700">Welcome</Text>

      {/* Email Input */}
      <View className="mb-4 w-full">
        <TextInput
          className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="gray"
        />
      </View>

      {/* Password Input */}
      <View className="mb-10 w-full">
        <TextInput
          className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="gray"
        />
      </View>

      {/* Sign In Button */}
      <View className="mb-4 w-full">
        <CButton
          title="Sign in"
          disabled={loading}
          handlePress={() => signInWithEmail()}
          containerStyles="bg-white py-4 rounded-md border b border-amber-700"
          textStyles="text-lg  font-semibold"
        />
      </View>

      {/* Sign Up Button */}
      <View className="w-full">
        <CButton
          title="Sign up"
          disabled={loading}
          handlePress={() => signUpWithEmail()}
          containerStyles="bg-amber-700 py-4 rounded-md"
          textStyles="text-lg text-white font-semibold"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
