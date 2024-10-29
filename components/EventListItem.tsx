import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

export default function EventListItem({ eventData }) {
  const { title, location, datetime, image } = eventData;
  return (
    <View className="gap-3  p-3 ">
      <View className="flex-row ">
        <View className="flex-1 gap-2">
          <Text className="text-lg font-semibold uppercase text-amber-600">
            {/* Wed , 11 sept • 8: 30 PM */}

            {datetime}
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
    </View>
  );
}

const styles = StyleSheet.create({});
