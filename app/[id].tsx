import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import events from '~/assets/events.json';
import dayjs from 'dayjs';
import CButton from '~/components/CButton';
import { supabase } from '~/utils/supabase';
import { useAuth } from '~/contexts/AuthProvider';

const EventPage = () => {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    fetchEventById();
  }, [id]);

  const fetchEventById = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    const { data: attendanceData, error: attErr } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id)
      .eq('event_id', id)
      .single();

    console.log('ad', attendanceData);
    console.log('ad-error', attErr);

    setEvent(data);
    setAttendance(attendanceData);
    setLoading(false);
  };

  const showJoinAlert = () => {
    Alert.alert('congratulations  🎉', 'You are going to this event', [
      // {
      //   text: 'Cancel',
      //   onPress: () => console.log('Cancel Pressed'),
      //   style: 'cancel',
      // },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const joinEvent = async () => {
    console.log('ehhll');

    const { data, error } = await supabase
      .from('attendance')
      .insert({ event_id: event.id, user_id: user.id })
      .select();

    if (data) {
      showJoinAlert();
    }

    setAttendance(data);
  };

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (!event) return;
  return (
    <View className="flex-1 bg-white p-3">
      {/* <Text>EventPage : {id}</Text> */}

      <Stack.Screen options={{ title: 'Event', headerBackTitleVisible: false }} />

      <Image
        source={{ uri: event.image_uri }}
        // style={{ width: 100, height: 100 }}
        className="aspect-video w-full rounded-lg"
      />

      <Text className="text-lg font-semibold uppercase text-amber-600">
        {/* Wed , 11 sept • 8: 30 PM */}

        {dayjs(event.datetime).format('ddd, MMM D,  h:mm A')}
      </Text>

      <Text className="text-3xl font-bold " numberOfLines={3}>
        {event.title}
      </Text>
      <Text className="font-regular text-lg " numberOfLines={3}>
        {event.description}
      </Text>

      <View className="absolute bottom-0 left-0 right-0 flex-row  items-center justify-between border-t-2 border-gray-200  p-6">
        <Text className="text-xl font-medium">Free</Text>

        {attendance ? (
          <Text className="font-bold text-green-600">Already Registered</Text>
        ) : (
          <CButton
            title={'Join and RSVP'}
            containerStyles={'bg-rose-400 p-4 rounded-md'}
            textStyles={'text-lg text-white font-bold'}
            handlePress={() => joinEvent()}
          />
        )}
      </View>
    </View>
  );
};

export default EventPage;

const styles = StyleSheet.create({});
