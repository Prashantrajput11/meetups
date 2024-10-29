import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function EventListItem({ eventData }) {
  const { title, location, datetime, image, id } = eventData;
  return (
    <Link href={`${id}`} asChild>
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
            <Text className="text-lg text-gray-500">{location} </Text>
          </View>

          {/* redner event image  */}

          <Image
            source={{ uri: image }}
            // style={{ width: 100, height: 100 }}
            className="aspect-video w-2/5 rounded-lg"
          />
        </View>

        {/* footer   */}

        <View className="flex-row gap-3">
          <Text className="mr-auto">16 going</Text>

          <Feather name="share" size={24} color="gray" />
          <Feather name="bookmark" size={24} color="gray" />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({});
