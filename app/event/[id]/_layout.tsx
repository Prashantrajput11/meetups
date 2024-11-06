// event/[id]/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const EventLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="attendance"
        options={{
          presentation: 'modal', // This makes attendance open as a modal
          title: 'Attendance List', // Title for the modal
          // headerShown: false,
        }}
      />
    </Stack>
  );
};

export default EventLayout;
