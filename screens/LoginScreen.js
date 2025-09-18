import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = async () => {
    try {
        const response = await fetch("http://192.168.1.91:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        
        if (response.ok && data.token) {
            alert(data.message);
            await AsyncStorage.setItem("token", data.token);
            console.log("Token stored, navigating to ExploreHome");
            navigation.replace("ExploreHome");
        } else {
            alert(data.message || "Invalid Credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong");
    }
  };

  return (
    <LinearGradient colors={['#8EC5FC', '#E0C3FC']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Log In</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number, username, or email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity style={styles.facebookButton}>
            <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    // Soft shadow for a professional look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 30,
    color: "#1f2937",
  },
  input: {
    width: "100%",
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    color: "#1f2937",
  },
  loginButton: {
    backgroundColor: "#1d4ed8",
    paddingVertical: 16,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  orText: {
    textAlign: "center",
    marginVertical: 12,
    color: "#374151",
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 16,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  facebookButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 18,
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#6b7280",
    fontSize: 16,
  },
  linkText: {
    color: "#1d4ed8",
    fontSize: 16,
    fontWeight: "600",
  },
});
