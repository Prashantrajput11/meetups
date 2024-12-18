import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CButton = ({ title, containerStyles, textStyles, handlePress, isLoading }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-200 h-30  items-center justify-center ${containerStyles}`}
      onPress={handlePress}
      disabled={isLoading}>
      <View className="flex-row items-center justify-center space-x-2">
        {isLoading ? (
          <>
            <ActivityIndicator color={'white'} />
            {/* <Text className={`${textStyles}`}>Loading...</Text> */}
          </>
        ) : (
          <Text className={`${textStyles}`}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({});
