import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Błędne dane logowania");
      return;
    }

    setErrorMessage("");
    router.replace("/(tabs)/library");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>📚 Cognitive Gallery</Text>
        <Text style={styles.welcomeText}>Welcome back.</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your mastery journey.
        </Text>

        {/* Wyświetlanie komunikatu o błędzie */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.form}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={[
              styles.input,
              errorMessage && !email.trim() ? styles.inputError : null,
            ]}
            placeholder="you@gallery.com"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, styles.passwordLabel]}>PASSWORD</Text>
          <TextInput
            style={[
              styles.input,
              errorMessage && !password.trim() ? styles.inputError : null,
            ]}
            placeholder="••••••••"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>FORGOT?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New here? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text style={styles.signupLink}>Create an account</Text>
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
    marginBottom: 24,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  form: {
    marginBottom: 32,
  },
  label: {
    fontSize: 12,
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
  forgotButton: {
    marginTop: 24,
    alignItems: "flex-end",
  },
  forgotText: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
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
  signupLink: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
