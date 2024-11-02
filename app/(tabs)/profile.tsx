import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import CButton from '~/components/CButton';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

import { ScreenContent } from '~/components/ScreenContent';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';
import { decode } from 'base64-arraybuffer';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const [email, setEmail] = useState('');
  const { session } = useAuth();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error, data } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const uploadAvatar = async () => {
    try {
      if (!avatarUrl?.startsWith('file://')) {
        console.log("Avatar URL doesn't start with 'file://'");
        return;
      }

      console.log('Avatar URL:', avatarUrl);

      // Convert file to base64
      const base64 = await FileSystem.readAsStringAsync(avatarUrl, {
        encoding: 'base64',
      });
      console.log('Base64 encoding successful');

      // Generate file path and specify content type
      // const filePath = `${Crypto.randomUUID()}.png`;
      const filePath = `${session?.user.id}.png`;
      const contentType = 'image/jpg';
      console.log('File path generated:', filePath);

      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${filePath}`, decode(base64), { contentType, upsert: true });

      if (error) {
        console.error('Error during upload:', error);
        throw new Error(`Failed to upload avatar: ${error.message}`);
      }

      console.log('Upload successful:', data);
      if (data) {
        return data.path;
      }
    } catch (error) {
      console.error('Error in uploadAvatar function:', error);
      Alert.alert('Upload Failed', 'There was an error uploading your avatar.');
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />

      <View className="m-4 items-center">
        <View>
          <Image
            source={{
              uri: avatarUrl
                ? avatarUrl
                : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            className="relative mb-4 h-40 w-40 items-center rounded-full"
          />

          <Pressable className="r-0 absolute  -right-0 top-4" onPress={pickImage}>
            <Feather name="edit" size={24} color="red" />
          </Pressable>
        </View>
        <TextInput
          className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800"
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="username"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="gray"
        />
        {/* <TextInput
          className="mt-4 w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="fullname "
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="gray"
        /> */}
        <TextInput
          className="mt-4 w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800"
          onChangeText={(text) => setEmail(text)}
          value={session.user.email}
          editable={false}
          placeholder="abc@gmail.com "
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="gray"
        />
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <CButton
          title={'Update '}
          handlePress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          // handlePress={() => updateProfile()}
          containerStyles="bg-rose-200 py-4 rounded-md border b border-amber-700 mx-4 my-4"
          textStyles="text-lg  text-white font-semibold uppercase"
        />
      )}

      <CButton
        title={'sign out'}
        handlePress={() => supabase.auth.signOut()}
        containerStyles="bg-rose-600 py-4 rounded-md border b border-amber-700 mx-4"
        textStyles="text-lg  text-white font-semibold uppercase"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
