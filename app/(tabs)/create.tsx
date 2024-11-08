import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CTextInput from '~/components/CTextInput';

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('This is an amazing event');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <ScrollView className="flex-1 bg-orange-100">
        <CTextInput
          title="Event Title"
          value={title}
          handleChangeText={setTitle}
          placeholder="Enter event title"
        />

        <CTextInput
          title="Description"
          value={description}
          handleChangeText={setDescription}
          multiline={true}
          numberOfLines={5}
          placeholder="Enter event description"
          otherStyles="mb-4"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;

const styles = StyleSheet.create({});
