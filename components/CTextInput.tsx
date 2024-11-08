// components/CTextInput.js
import { View, Text, TextInput } from 'react-native';
import React from 'react';

const CTextInput = ({
  title,
  value,
  otherStyles,
  handleChangeText,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  return (
    <View className={`mx-4 space-y-2 ${otherStyles}`}>
      <Text className="font-pbold mt-4 text-base text-black">{title}</Text>

      <View
        className={`focus:border-secondary-100 rounded-md border-2 border-gray-100 bg-gray-200 px-4 
        ${multiline ? 'min-h-[120px] py-2' : 'h-14'}`}>
        <TextInput
          className={`font-psemibold flex-1 ${multiline ? 'text-base leading-6' : ''}`}
          value={value}
          onChangeText={handleChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          style={multiline ? { height: 'auto' } : undefined}
          {...props}
        />
      </View>
    </View>
  );
};

export default CTextInput;
