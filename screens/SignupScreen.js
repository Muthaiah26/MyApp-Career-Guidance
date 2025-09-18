import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
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

  const handleSignup = async () => {
    try {
      const response = await fetch("http://192.168.1.91:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          mobileNo: Number(mobileNo),
          username,
          fullName
        }),
      });
      const data = await response.json();
      
      if (response.ok) {
        alert("Account created successfully!");
        navigation.replace("LoginScreen");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#666"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            value={mobileNo}
            onChangeText={setMobileNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.linkText}>Log In</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
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
  button: {
    backgroundColor: "#1d4ed8",
    paddingVertical: 16,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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
