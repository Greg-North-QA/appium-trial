import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colours } from '../theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colours.primaryDark },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colours.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Automation Lab' }} />
        <Stack.Screen name="registration" options={{ title: 'Registration' }} />
        <Stack.Screen name="result" options={{ title: 'Submission result' }} />
      </Stack>
    </>
  );
}
