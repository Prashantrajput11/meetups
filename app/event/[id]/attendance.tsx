import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { supabase } from '~/utils/supabase';

const EventAttendance = () => {
  const { id } = useLocalSearchParams();
  const [attendees, setAttendees] = useState(0);

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  const fetchAttendance = async () => {
    const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id);

    setAttendees(data);
  };

  const renderAttendees = useCallback(({ item }) => {
    return (
      <View className="mx-4 my-2 flex-row items-center gap-4 rounded-md bg-amber-300 py-2">
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          className="ml-4 h-10 w-10 rounded-full"
        />
        <Text className=" ml-2 font-semibold">{item.profiles.username}</Text>
      </View>
    );
  }, []);

  return (
    <View>
      <Stack.Screen options={{ title: 'Attendees', headerBackTitleVisible: false }} />
      <Text className="mx-4 my-4">People Attending this event</Text>

      <FlatList data={attendees} renderItem={renderAttendees} />
    </View>
  );
};

export default EventAttendance;

const styles = StyleSheet.create({});
