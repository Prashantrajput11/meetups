import { Stack } from 'expo-router';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import EventListItem from '~/components/EventListItem';
import { useAuth } from '~/contexts/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

export default function EventsScreen() {
  const { user, session } = useAuth();
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const fetchNearbyEvents = async () => {
    if (!location) {
      return;
    }

    setIsLoading(true);
    try {
      let { data, error } = await supabase.rpc('nearby_events', {
        lat: location?.coords.latitude,
        long: location.coords.longitude,
      });

      setIsLoading(false);
      if (error) console.error(error);
      else {
        setEvents(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchNearbyEvents();
    }
  }, [location]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="black" size={'large'} />
      </View>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a1a', '#2a2a2a']}
        style={styles.container}

        // className="h-80 flex-1"
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mb-10 flex-row justify-between">
          <Text style={styles.title}>Meetups</Text>
          <View style={styles.profileIcon} />
        </View>
        <Text style={styles.greeting}>{`Hello ${session.user.email}`}</Text>
        <Text style={styles.subtitle}>Discover Amazing Events</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find amazing events"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Events 🔥</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
      </LinearGradient>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem eventData={item} />}
        // horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    paddingTop: 60,
    paddingHorizontal: 20,
    height: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  greeting: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  viewAll: {
    fontSize: 14,
    color: '#ff9900',
  },
  list: {
    flex: 1 / 2,
    marginBottom: 20,
  },
});
