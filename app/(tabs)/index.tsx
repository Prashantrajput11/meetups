import { Stack } from 'expo-router';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import EventList from '~/components/EventListItem';
import EventListItem from '~/components/EventListItem';
import events from '~/assets/events.json';

// const event = events[3];

export default function Events() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />

      {/* <EventListItem eventData={event} /> */}

      <FlatList data={events} renderItem={({ item }) => <EventListItem eventData={item} />} />
      {/* <EventListItem />
      <EventListItem /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
