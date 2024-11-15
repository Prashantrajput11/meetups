import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import CTextInput from '~/components/CTextInput';
import DatePicker from 'react-native-date-picker';
import { Button } from '~/components/Button';
import CButton from '~/components/CButton';
import { supabase } from '~/utils/supabase';
import { useAuth } from '~/contexts/AuthProvider';
import { router } from 'expo-router';

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('This is an amazing event');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setDate(new Date());
  };

  const createEvent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .insert([{ title, description, user_id: user.id, location_point: 'POINT(28.37  77.05)' }])
        .select()
        .single();

      if (error) {
        Alert.alert('Failed to create an event', error.message);
      } else {
        resetFields();
        router.push(`/event/${data.id}`);
      }

      setLoading(false);
    } catch (error) {
      console.log('data event error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="flex-1">
        <ScrollView className="flex-1 bg-orange-100">
          <View className="p-4">
            <CTextInput
              title="Event Title"
              value={title}
              handleChangeText={setTitle}
              placeholder="Enter event title"
            />

            <CTextInput
              title="Description"
              value={description}
              handleChangeText={setDescription}
              multiline={true}
              numberOfLines={5}
              placeholder="Enter event description"
              otherStyles="mb-4"
            />

            <Text
              className="rounded-md border border-gray-200 bg-white p-3"
              onPress={() => setOpen(true)}>
              {date.toLocaleString()}
            </Text>

            <DatePicker
              modal
              open={open}
              date={date}
              minimumDate={new Date()}
              minuteInterval={15}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </ScrollView>

        {/* Button container outside ScrollView to keep it fixed at bottom */}
        <View className="bg-orange-100 p-4">
          <CButton
            title={'Create Event'}
            handlePress={() => createEvent()}
            isLoading={loading}
            loaderColor="white"
            containerStyles="bg-rose-600 py-4 rounded-md border border-amber-700"
            textStyles="text-lg text-white font-semibold uppercase"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Create;
