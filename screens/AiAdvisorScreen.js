import React, { useState, useRef, useEffect } from 'react';
import { Animated, Switch,  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';


const API_URL = "http://192.168.1.91:5000/chatbot"; 

function LoadingDots() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <Text style={styles.loadingText}>Loading{dots}</Text>;
}

export default function AIAdvisorScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: "Hello! I'm your AI Career Advisor. How can I help you today?", isUser: false },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSend = async () => {
    if (inputText.trim()) {
      const userText = inputText;
      setInputText("");
  
      const userMessage = { id: Date.now().toString(), text: userText, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      console.log("Sending message to API:", userText);
      setIsLoading(true);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        });
      
        let responseData;
        const contentType = response.headers.get("content-type");
        
        if (contentType?.includes("application/json")) {
          responseData = await response.json();
        } else {
          const text = await response.text();
          responseData = JSON.parse(text); 
        }
      
        if (!response.ok || !responseData.reply) {
          throw new Error(responseData.reply || "Invalid response format");
        }
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: responseData.reply,
          isUser: false
        };
        setMessages(prev => [...prev, aiResponse]);
        if (voiceEnabled) {
        Speech.speak(responseData.reply, { language: 'en', rate: 1.0 });
        
        }
      
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          text: "I'm having trouble responding right now. Please try again later.",
          isUser: false,
        };
        setMessages(prev => [...prev, errorMessage]);
      }finally{
        setIsLoading(false);
      }
    }
     
  };

  return (
    <LinearGradient colors={['#8EC5FC', '#E0C3FC']} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>AI Career Advisor</Text>
          </View>
          <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
            {messages.map(message => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
                ]}
              >
                <View style={[styles.message, message.isUser ? styles.userMessage : styles.aiMessage]}>
                  <Text style={[styles.messageText, message.isUser ? styles.userMessageText : styles.aiMessageText]}>
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
               {isLoading && (
              <View style={[styles.messageWrapper, styles.aiMessageWrapper]}>
                <View style={[styles.message, styles.aiMessage]}>
                  <LoadingDots />
                </View>
              </View>
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVoiceEnabled(!voiceEnabled)} style={{ marginRight: 10 }}>
  <Ionicons name={voiceEnabled ? "volume-high" : "volume-mute"} size={24} color={voiceEnabled ? "#4ade80" : "#f87171"} />
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
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Clean white background for the overall screen
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Transparent overlay for message area
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: "flex-end",
  },
  aiMessageWrapper: {
    alignItems: "flex-start",
  },
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: "#6366f1",
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: "#fff",
  },
  aiMessageText: {
    color: "#0f172a",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "rgba(255, 255, 255, 0.95)", 
  },
  input: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    borderRadius: 24,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: "#f1f5f9",
    color: "#0f172a",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366f1",
  },
  loadingText: {
    fontSize: 16,
    color: "#0f172a",
    fontStyle: "italic",
  },
});