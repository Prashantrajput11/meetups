import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import events from '~/assets/events.json';
import dayjs from 'dayjs';

const EventPage = () => {
  const { id } = useLocalSearchParams();

  const event = events.find((event) => event.id === id);

  return (
    <View className="flex-1 bg-white p-3">
      {/* <Text>EventPage : {id}</Text> */}

      <Stack.Screen options={{ title: 'Event', headerBackTitleVisible: false }} />

      <Image
        source={{ uri: event.image }}
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
    </View>
  );
};

export default EventPage;

const styles = StyleSheet.create({});
