import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colours } from '../theme';

export function ResultScreen() {
  const params = useLocalSearchParams<{
    name: string;
    email: string;
    experience: string;
    success: string;
    reference: string;
  }>();
  const { name, email, experience, reference } = params;
  const success = params.success === 'true';

  return (
    <View style={styles.container} testID="result-screen" accessibilityLabel="result-screen">
      <View style={[styles.statusCard, success ? styles.successCard : styles.failureCard]}>
        <Text
          style={[styles.icon, success ? styles.successText : styles.failureText]}
          accessibilityLabel={success ? 'submission-success-icon' : 'submission-failure-icon'}
        >
          {success ? '✓' : '!'}
        </Text>
        <Text
          style={[styles.heading, success ? styles.successText : styles.failureText]}
          testID="result-heading"
          accessibilityLabel="result-heading"
        >
          {success ? 'Registration complete' : 'Submission failed'}
        </Text>
        <Text style={styles.message} testID="result-message" accessibilityLabel="result-message">
          {success
            ? `Thanks ${name}. Your practice registration has been accepted.`
            : 'The stub service rejected this email address. Go back and try another one.'}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsHeading}>Submitted details</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value} testID="result-email" accessibilityLabel="result-email">
          {email}
        </Text>
        <Text style={styles.label}>Experience</Text>
        <Text style={styles.value} testID="result-experience" accessibilityLabel="result-experience">
          {experience}
        </Text>
        <Text style={styles.label}>Reference</Text>
        <Text style={styles.value} testID="result-reference" accessibilityLabel="result-reference">
          {reference}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="return-home"
        testID="return-home"
        style={styles.primaryButton}
        onPress={() => router.dismissAll()}
      >
        <Text style={styles.primaryButtonText}>Return home</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="register-again"
        testID="register-again"
        style={styles.secondaryButton}
        onPress={() => router.replace('/registration')}
      >
        <Text style={styles.secondaryButtonText}>Register again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colours.background, padding: 24, gap: 18 },
  statusCard: { borderRadius: 16, borderWidth: 1, padding: 22, alignItems: 'center', gap: 10 },
  successCard: { backgroundColor: colours.successBackground, borderColor: '#ABEFC6' },
  failureCard: { backgroundColor: colours.errorBackground, borderColor: '#FECDCA' },
  icon: { fontSize: 40, fontWeight: '800' },
  heading: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  successText: { color: colours.success },
  failureText: { color: colours.error },
  message: { color: colours.text, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  details: {
    backgroundColor: colours.surface,
    borderColor: colours.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 5,
  },
  detailsHeading: { color: colours.text, fontSize: 18, fontWeight: '700', marginBottom: 8 },
  label: { color: colours.muted, fontSize: 12, fontWeight: '700', marginTop: 8, textTransform: 'uppercase' },
  value: { color: colours.text, fontSize: 16 },
  primaryButton: { alignItems: 'center', backgroundColor: colours.primary, borderRadius: 12, padding: 15 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colours.surface,
    borderColor: colours.primary,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  secondaryButtonText: { color: colours.primary, fontSize: 16, fontWeight: '700' },
});
