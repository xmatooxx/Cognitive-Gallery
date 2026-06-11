import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [confirmPasswordHasError, setConfirmPasswordHasError] = useState(false);

  const handleSignup = () => {
    if (!email.trim()) {
      setErrorMessage("Adres e-mail jest wymagany.");
      setEmailHasError(true);
      setPasswordHasError(false);
      setConfirmPasswordHasError(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Niepoprawny format adresu e-mail.");
      setEmailHasError(true);
      setPasswordHasError(false);
      setConfirmPasswordHasError(false);
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Hasło jest wymagane.");
      setEmailHasError(false);
      setPasswordHasError(true);
      setConfirmPasswordHasError(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Hasło musi mieć co najmniej 6 znaków.");
      setEmailHasError(false);
      setPasswordHasError(true);
      setConfirmPasswordHasError(false);
      return;
    }

    if (!confirmPassword.trim()) {
      setErrorMessage("Musisz potwierdzić hasło.");
      setEmailHasError(false);
      setPasswordHasError(false);
      setConfirmPasswordHasError(true);
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage("Hasła muszą być identyczne.");
      setEmailHasError(false);
      setPasswordHasError(false);
      setConfirmPasswordHasError(true);
      return;
    }

    setEmailHasError(false);
    setPasswordHasError(false);
    setConfirmPasswordHasError(false);
    setErrorMessage("");

    Alert.alert(
      "Sukces",
      "Konto zostało zarejestrowane pomyślnie. Możesz się teraz zalogować.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/auth/login"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>📚 Cognitive Gallery</Text>
        <Text style={styles.welcomeText}>Create an account.</Text>
        <Text style={styles.subtitle}>Start your mastery journey today.</Text>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.form}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={[
              styles.input,
              emailHasError ? styles.inputError : null,
            ]}
            placeholder="you@gallery.com"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
              setEmailHasError(false);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, styles.passwordLabel]}>PASSWORD</Text>
          <TextInput
            style={[
              styles.input,
              passwordHasError ? styles.inputError : null,
            ]}
            placeholder="••••••••"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
              setPasswordHasError(false);
            }}
            secureTextEntry
          />

          <Text style={[styles.label, styles.passwordLabel]}>
            CONFIRM PASSWORD
          </Text>
          <TextInput
            style={[
              styles.input,
              confirmPasswordHasError ? styles.inputError : null,
            ]}
            placeholder="••••••••"
            placeholderTextColor="#ccc"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrorMessage("");
              setConfirmPasswordHasError(false);
            }}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          activeOpacity={0.8}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  content: {
    width: "100%",
    maxWidth: 400,
  },
  logo: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
  },
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  passwordLabel: {
    marginTop: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderBottomColor: "#ff3b30",
    borderBottomWidth: 2,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
