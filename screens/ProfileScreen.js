import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
  Animated,
  Dimensions,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [activeTab, setActiveTab] = useState('profile');

  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: 'clamp',
  });

  const imageSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [80, 60],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });

  const nameSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [24, 20],
    extrapolate: 'clamp',
  });

  const achievements = [
    { title: 'Early Bird', description: 'Completed 5 morning courses', icon: 'sunny-outline', progress: 100, color: '#f59e0b' },
    { title: 'Coding Master', description: 'Finished all programming modules', icon: 'code-slash-outline', progress: 75, color: '#3b82f6' },
    { title: 'Quiz Champion', description: 'Score 90%+ on 10 quizzes', icon: 'trophy-outline', progress: 60, color: '#10b981' },
  ];

  const theme = {
    background: isDark ? '#0f172a' : '#f8fafc',
    card: isDark ? '#1e293b' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#0f172a',
    subtext: isDark ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    secondary: '#ec4899',
    accent: isDark ? '#8b5cf6' : '#7c3aed',
    success: '#10b981',
    error: '#ef4444',
    border: isDark ? '#334155' : '#e2e8f0',
    shadow: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Personal Information', badge: null },
    { icon: 'school-outline', title: 'Education History', badge: null },
    { icon: 'bookmark-outline', title: 'Saved Careers', badge: '3' },
    { icon: 'notifications-outline', title: 'Notifications', badge: '5' },
    { icon: 'settings-outline', title: 'Settings', badge: null },
    { icon: 'help-circle-outline', title: 'Help & Support', badge: null },
  ];

  const renderTabContent = () => {
    if (activeTab === 'achievements') {
      return renderAchievements();
    }
    return renderMainProfile();
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const renderAchievements = () => {
    return (
      <View style={styles.achievementsContainer}>
        {achievements.map((achievement, index) => (
          <View
            key={index}
            style={[
              styles.achievementCard,
              { backgroundColor: theme.card },
            ]}
          >
            <View style={styles.achievementHeader}>
              <View style={[styles.achievementIconContainer, { backgroundColor: `${achievement.color}20` }]}>
                <Ionicons name={achievement.icon} size={24} color={achievement.color} />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementTitle, { color: theme.text }]}>{achievement.title}</Text>
                <Text style={[styles.achievementDesc, { color: theme.subtext }]}>{achievement.description}</Text>
              </View>
            </View>
            <View style={[styles.progressContainer, { backgroundColor: theme.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${achievement.progress}%`,
                    backgroundColor: achievement.color,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.subtext }]}>{achievement.progress}% Complete</Text>
          </View>
        ))}

        <View style={styles.moreAchievements}>
          <LinearGradient
            colors={[theme.primary, theme.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.moreAchievementsGradient}
          >
            <Text style={styles.moreAchievementsText}>More achievements coming soon!</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </LinearGradient>
        </View>
      </View>
    );
  };

  const renderMainProfile = () => {
    return (
      <>
        <View style={[styles.statsContainer, { backgroundColor: theme.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Courses</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.success }]}>85%</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Progress</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.accent }]}>8</Text>
            <Text style={[styles.statLabel, { color: theme.subtext }]}>Certificates</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                { backgroundColor: theme.card },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                <LinearGradient
                  colors={[theme.primary, theme.accent]}
                  style={styles.menuIconContainer}
                >
                  <Ionicons name={item.icon} size={20} color="#ffffff" />
                </LinearGradient>
                <Text style={[styles.menuText, { color: theme.text }]}>{item.title}</Text>
              </View>
              <View style={styles.menuRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.themeToggleContainer, { backgroundColor: theme.card }]}
          onPress={toggleTheme}
        >
          <View style={styles.themeToggleContent}>
            <Ionicons
              name={isDark ? 'moon' : 'sunny'}
              size={20}
              color={isDark ? '#a78bfa' : '#fbbf24'}
              style={styles.themeIcon}
            />
            <Text style={[styles.themeToggleText, { color: theme.text }]}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#e2e8f0', true: '#4f46e5' }}
            thumbColor={isDark ? '#a78bfa' : '#ffffff'}
            ios_backgroundColor="#e2e8f0"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.card }]}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>Log Out</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            backgroundColor: theme.background,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Animated.View style={{ opacity: headerOpacity }}>
            <View style={styles.profileSection}>
              <Animated.Image
                source={{ uri: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png' }}
                style={[styles.profileImage, { height: imageSize, width: imageSize }]}
              />
              <View style={styles.profileInfo}>
                <Animated.Text style={[styles.name, { color: theme.text, fontSize: nameSize }]}>
                  Muthaiah Pandi RP
                </Animated.Text>
                <Text style={[styles.email, { color: theme.subtext }]}>
                  muthaiah.p@example.com
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Tab Navigation */}
      <View style={[styles.tabContainer, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'profile' && [styles.activeTab, { borderBottomColor: theme.primary }],
          ]}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons
            name="person"
            size={20}
            color={activeTab === 'profile' ? theme.primary : theme.subtext}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'profile' ? theme.primary : theme.subtext },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'achievements' && [styles.activeTab, { borderBottomColor: theme.primary }],
          ]}
          onPress={() => setActiveTab('achievements')}
        >
          <Ionicons
            name="trophy"
            size={20}
            color={activeTab === 'achievements' ? theme.primary : theme.subtext}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'achievements' ? theme.primary : theme.subtext },
            ]}
          >
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY }  }}],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {renderTabContent()}
      </Animated.ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#6366f1',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: -15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  themeToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    marginRight: 12,
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  achievementsContainer: {
    padding: 20,
  },
  achievementCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  achievementDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  achievementDetailsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  achievementButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  achievementButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  moreAchievements: {
    alignItems: 'center',
    marginTop: 10,
  },
  moreAchievementsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    width: width * 0.9,
  },
  moreAchievementsText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  eventsContainer: {
    padding: 20,
  },
  eventCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  }
});