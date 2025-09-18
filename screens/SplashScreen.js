import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace("LoginScreen");
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/logo.jpg")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Career Guidance
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});
