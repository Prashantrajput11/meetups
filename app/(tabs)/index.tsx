import { Stack } from 'expo-router';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import EventList from '~/components/EventListItem';
import EventListItem from '~/components/EventListItem';
import events from '~/assets/events.json';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';

// const event = events[3];

export default function Events() {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    let { data, error } = await supabase.from('events').select('*');

    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
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
