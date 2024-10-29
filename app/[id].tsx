import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import events from '~/assets/events.json';

const EventPage = () => {
  const { id } = useLocalSearchParams();

  const event = events.find((event) => event.id === id);

  return (
    <View>
      <Text>EventPage : {id}</Text>
      <Text>EventPage : {event.title}</Text>
    </View>
  );
};

export default EventPage;

const styles = StyleSheet.create({});
