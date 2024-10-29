import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CButton = ({ title, containerStyles, textStyles, handlePress, isLoading }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-200 h-30  items-center justify-center ${containerStyles}`}
      onPress={handlePress}
      disabled={isLoading}>
      <Text className={`${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({});
