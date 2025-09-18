import React from 'react';
import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ExploreScreen from './screens/ExploreScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import CareerDetailScreen from './screens/CareerDetailScreen';
import AiAdvisorScreen from './screens/AiAdvisorScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';
import QuizScreen from './screens/QuizScreen';
import SearchScreen from './screens/SearchScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStackScreen=()=> {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

const ExploreStack = () => {
  return (
   
    <Stack.Navigator initialRouteName='SplashScreen'>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{title:"Career Guidance App"}} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{title:"Search"}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title:"Login Screen"}} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{title:"Signup Screen"}} />
      <Stack.Screen name="ExploreHome" component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CareerDetail" component={CareerDetailScreen} options={{ title: "Career Details" }} />
      <Stack.Screen name="AssessmentScreen" component={AssessmentScreen} options={{title:"Skill Assessment"}} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{title:"Quiz"}} />
    </Stack.Navigator>
  
  );
};


const BottomTabNavigator = () =>{
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#94a3b8' : '#64748b',
        tabBarStyle: {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 5,
          height: 60 + insets.bottom,
        },
        headerShown: false,
      }}
    >
      {/* Wrapped Explore in Stack Navigator */}
      <Tab.Screen
        name="Explore"
        component={ExploreStack} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AI Advisor"
        component={AiAdvisorScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubble-ellipses" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMain(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
   
   
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
      
    
  
  );
}
