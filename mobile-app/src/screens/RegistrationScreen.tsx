import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colours } from '../theme';

type Experience = 'Beginner' | 'Intermediate' | 'Advanced';
type Errors = Partial<Record<'name' | 'email' | 'password' | 'terms', string>>;

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export function RegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState<Experience>('Beginner');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Errors = {};
    if (name.trim().length < 2) nextErrors.name = 'Enter at least 2 characters.';
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (!termsAccepted) nextErrors.terms = 'Accept the practice terms to continue.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    await wait(1200);
    const success = !email.toLowerCase().includes('fail');
    router.replace({
      pathname: '/result',
      params: {
        name: name.trim(),
        email: email.trim(),
        experience,
        success: String(success),
        reference: success ? `APP-${Date.now().toString().slice(-6)}` : 'NOT-CREATED',
      },
    });
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setExperience('Beginner');
    setTermsAccepted(false);
    setUpdatesEnabled(true);
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      testID="registration-screen"
      accessibilityLabel="registration-screen"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        accessibilityLabel="registration-form-scroll"
      >
        <View>
          <Text style={styles.title}>Create your profile</Text>
          <Text style={styles.subtitle}>All data stays in the app and is only used for automation practice.</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            accessibilityLabel="full-name-input"
            testID="full-name-input"
            autoCapitalize="words"
            autoComplete="name"
            placeholder="Alex Tester"
            placeholderTextColor="#8893A5"
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />
          {errors.name ? (
            <Text style={styles.error} testID="name-error" accessibilityLabel="name-error">
              {errors.name}
            </Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            accessibilityLabel="email-input"
            testID="email-input"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="alex@example.com"
            placeholderTextColor="#8893A5"
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
          />
          {errors.email ? (
            <Text style={styles.error} testID="email-error" accessibilityLabel="email-error">
              {errors.email}
            </Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Practice password</Text>
          <TextInput
            accessibilityLabel="password-input"
            testID="password-input"
            autoCapitalize="none"
            autoComplete="off"
            placeholder="At least 6 characters"
            placeholderTextColor="#8893A5"
            secureTextEntry
            style={[styles.input, errors.password && styles.inputError]}
            value={password}
            onChangeText={setPassword}
            returnKeyType="done"
          />
          {errors.password ? (
            <Text style={styles.error} testID="password-error" accessibilityLabel="password-error">
              {errors.password}
            </Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Appium experience</Text>
          <View style={styles.segmentedControl} accessibilityLabel="experience-options">
            {(['Beginner', 'Intermediate', 'Advanced'] as Experience[]).map((option) => {
              const selected = experience === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  accessibilityLabel={`experience-${option.toLowerCase()}`}
                  testID={`experience-${option.toLowerCase()}`}
                  onPress={() => setExperience(option)}
                  style={[styles.segment, selected && styles.segmentSelected]}
                >
                  <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Accept practice terms</Text>
            <Text style={styles.switchDescription}>Required to submit the form.</Text>
          </View>
          <Switch
            accessibilityLabel="terms-switch"
            testID="terms-switch"
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            trackColor={{ false: '#AAB3C2', true: '#8FB0FF' }}
            thumbColor={termsAccepted ? colours.primary : '#F7F7F7'}
          />
        </View>
        {errors.terms ? (
          <Text style={styles.error} testID="terms-error" accessibilityLabel="terms-error">
            {errors.terms}
          </Text>
        ) : null}

        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Product updates</Text>
            <Text style={styles.switchDescription}>An optional switch for test practice.</Text>
          </View>
          <Switch
            accessibilityLabel="updates-switch"
            testID="updates-switch"
            value={updatesEnabled}
            onValueChange={setUpdatesEnabled}
            trackColor={{ false: '#AAB3C2', true: '#8FB0FF' }}
            thumbColor={updatesEnabled ? colours.primary : '#F7F7F7'}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="submit-registration"
          accessibilityState={{ disabled: submitting }}
          testID="submit-registration"
          disabled={submitting}
          style={[styles.primaryButton, submitting && styles.buttonDisabled]}
          onPress={submit}
        >
          {submitting ? (
            <View style={styles.loadingRow} accessibilityLabel="submitting-indicator">
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Submitting…</Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>Submit registration</Text>
          )}
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="reset-form"
          testID="reset-form"
          disabled={submitting}
          style={styles.secondaryButton}
          onPress={reset}
        >
          <Text style={styles.secondaryButtonText}>Reset form</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colours.background },
  container: { padding: 24, paddingBottom: 44, gap: 18 },
  title: { color: colours.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colours.muted, fontSize: 15, lineHeight: 22, marginTop: 6 },
  fieldGroup: { gap: 7 },
  label: { color: colours.text, fontSize: 14, fontWeight: '700' },
  input: {
    backgroundColor: colours.surface,
    borderColor: colours.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colours.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  inputError: { borderColor: colours.error, borderWidth: 2 },
  error: { color: colours.error, fontSize: 13, fontWeight: '600' },
  segmentedControl: { flexDirection: 'row', gap: 6 },
  segment: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colours.surface,
    borderColor: colours.border,
    borderRadius: 9,
    borderWidth: 1,
    paddingVertical: 11,
  },
  segmentSelected: { backgroundColor: colours.primary, borderColor: colours.primary },
  segmentText: { color: colours.text, fontSize: 12, fontWeight: '700' },
  segmentTextSelected: { color: '#FFFFFF' },
  switchRow: {
    alignItems: 'center',
    backgroundColor: colours.surface,
    borderColor: colours.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  switchCopy: { flex: 1, paddingRight: 12 },
  switchTitle: { color: colours.text, fontSize: 15, fontWeight: '700' },
  switchDescription: { color: colours.muted, fontSize: 13, marginTop: 3 },
  primaryButton: { alignItems: 'center', backgroundColor: colours.primary, borderRadius: 12, padding: 16 },
  buttonDisabled: { opacity: 0.7 },
  loadingRow: { flexDirection: 'row', gap: 10 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colours.surface,
    borderColor: colours.primary,
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
  },
  secondaryButtonText: { color: colours.primary, fontSize: 16, fontWeight: '700' },
});
