import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

export default function AppTabs({ tabsConfig, screenOptions = {} }) {
  const insets = useSafeAreaInsets();

  const defaultScreenOptions = {
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
    ...screenOptions,
  };

  return (
    <Tabs screenOptions={defaultScreenOptions}>
      {tabsConfig.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => tab.icon({ color, focused }),
            ...tab.options,
          }}
        />
      ))}
    </Tabs>
  );
}