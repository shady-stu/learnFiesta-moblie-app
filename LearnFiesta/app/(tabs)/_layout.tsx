import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function AppTabs({ tabsConfig }: any) {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom || 12,
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 2 },
        tabBarItemStyle: { paddingVertical: 4 },
      }}
    >
      {tabsConfig.map((tab: any) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }: any) => tab.icon({ color, focused }),
          }}
        />
      ))}
    </Tabs>
  );
}

const tabsConfig = [
  {
    name: 'index',
    title: 'Home',
    icon: ({ color, focused }: any) => (
      <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
    ),
  },
  {
    name: 'search',
    title: 'Search',
    icon: ({ color, focused }: any) => (
      <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
    ),
  },
  {
    name: 'MyCourses',
    title: 'My Courses',
    icon: ({ color, focused }: any) => (
      <Ionicons name={focused ? 'play-circle' : 'play-circle-outline'} size={24} color={color} />
    ),
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: ({ color, focused }: any) => (
      <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={color} />
    ),
  },
];

export default function TabsLayout() {
  return <AppTabs tabsConfig={tabsConfig} />;
}