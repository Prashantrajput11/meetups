import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { EVENT_GUIDELINES } from '../constants/constants';

const Guidelines = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="mb-6 text-2xl font-bold">General Guidelines For All Events </Text>

        {/* Dos Section */}
        <View className="mb-8">
          <Text className="mb-4 text-xl font-semibold text-green-600">Do's</Text>
          {EVENT_GUIDELINES.dos.map((item, index) => (
            <View key={index} className="mb-4 flex-row">
              <View className="mr-3 mt-1">
                <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-lg font-semibold">{item.title}</Text>
                <Text className="text-gray-600">{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Don'ts Section */}
        <View className="mb-8">
          <Text className="mb-4 text-xl font-semibold text-red-600">Don'ts</Text>
          {EVENT_GUIDELINES.donts.map((item, index) => (
            <View key={index} className="mb-4 flex-row">
              <View className="mr-3 mt-1">
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-lg font-semibold">{item.title}</Text>
                <Text className="text-gray-600">{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Additional Information */}
        <View className="mb-6 rounded-lg bg-gray-50 p-4">
          <Text className="mb-2 text-lg font-semibold">Important Note</Text>
          <Text className="text-gray-600">
            Violation of these guidelines may result in temporary or permanent suspension from the
            platform. Event organizers reserve the right to remove participants who do not follow
            these guidelines.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default function Modal() {
  return (
    <>
      <Guidelines />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
