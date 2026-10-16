import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colours } from '../theme';

export function HomeScreen() {
  return (
    <View style={styles.container} testID="home-screen" accessibilityLabel="home-screen">
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MOBILE AUTOMATION LAB</Text>
        <Text style={styles.title} testID="home-title" accessibilityLabel="home-title">
          Appium Practice
        </Text>
        <Text style={styles.subtitle}>
          A small React Native app built for practising reliable mobile test automation.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills to practise</Text>
        <Text style={styles.listItem}>• Find elements using accessibility IDs</Text>
        <Text style={styles.listItem}>• Navigate between native screens</Text>
        <Text style={styles.listItem}>• Enter, clear and validate form data</Text>
        <Text style={styles.listItem}>• Handle scrolling, switches and waits</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="start-registration"
        testID="start-registration"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/registration')}
      >
        <Text style={styles.buttonText}>Start registration</Text>
      </Pressable>

      <Text style={styles.hint} testID="practice-hint" accessibilityLabel="practice-hint">
        Tip: use an email containing “fail” to exercise the stubbed error response.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
    padding: 24,
    justifyContent: 'center',
    gap: 22,
  },
  hero: { gap: 8 },
  eyebrow: {
    color: colours.primary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: { color: colours.text, fontSize: 38, fontWeight: '800' },
  subtitle: { color: colours.muted, fontSize: 17, lineHeight: 25 },
  card: {
    backgroundColor: colours.surface,
    borderColor: colours.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 10,
  },
  cardTitle: { color: colours.text, fontSize: 19, fontWeight: '700', marginBottom: 4 },
  listItem: { color: colours.muted, fontSize: 15, lineHeight: 22 },
  button: {
    alignItems: 'center',
    backgroundColor: colours.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  buttonPressed: { backgroundColor: colours.primaryDark },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  hint: { color: colours.muted, fontSize: 13, lineHeight: 19, textAlign: 'center' },
});
