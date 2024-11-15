import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { supabase } from '~/utils/supabase';

export default function EventListItem({ eventData }) {
  const [peopleCount, setPeopleCount] = useState(0);
  const { title, location, datetime, image_uri, id, dist_meters } = eventData;

  useEffect(() => {
    fetchPeople();
  }, [id]);

  const fetchPeople = async () => {
    const { count, error } = await supabase
      .from('attendance')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', id);

    setPeopleCount(count);

    console.log('count', count);
    // console.log('error', error);
  };

  return (
    <Link href={`/event/${id}`} asChild>
      <Pressable className="gap-3  border-b-2 border-gray-200 p-3 ">
        <View className="flex-row ">
          <View className="flex-1 gap-2">
            <Text className="text-lg font-semibold uppercase text-amber-600">
              {/* Wed , 11 sept • 8: 30 PM */}

              {dayjs(datetime).format('ddd, MMM D,  h:mm A')}
            </Text>
            <Text className="text-xl font-bold " numberOfLines={3}>
              {title}
            </Text>
            <Text className="text-sm font-light  " numberOfLines={3}>
              {Math.floor(dist_meters / 1000)} kms
            </Text>
            <Text className="text-lg text-gray-500">{location} </Text>
          </View>

          {/* redner event image  */}

          <Image
            source={{ uri: image_uri }}
            // style={{ width: 100, height: 100 }}
            className="aspect-video w-2/5 rounded-lg"
          />
        </View>

        {/* footer   */}

        <View className="flex-row gap-3">
          <Text className="mr-auto">{peopleCount} going</Text>

          <Feather name="share" size={24} color="gray" />
          <Feather name="bookmark" size={24} color="gray" />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({});
