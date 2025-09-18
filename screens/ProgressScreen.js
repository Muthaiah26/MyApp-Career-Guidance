import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = {
    primary: '#6366f1', // Indigo
    secondary: '#ec4899', // Pink
    success: '#10b981', // Emerald
    warning: '#f59e0b', // Amber
    info: '#06b6d4', // Cyan
    background: isDark ? '#1a1b1e' : '#f8fafc',
    cardBg: isDark ? '#27272a' : '#ffffff',
    text: isDark ? '#f1f5f9' : '#0f172a',
    lightText: isDark ? '#94a3b8' : '#64748b',
    progressBg: isDark ? '#3f3f46' : '#e2e8f0',
  };

  // State for skill data
  const [skillsData, setSkillsData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [65, 70, 75, 78, 82, 85] }],
  });

  // State for courses
  const [courses, setCourses] = useState([
    { name: 'Introduction to Programming', progress: 100, points: 500 },
    { name: 'Data Analysis Fundamentals', progress: 100, points: 500 },
    { name: 'UI/UX Design Basics', progress: 75, points: 375 },
    { name: 'Mobile App Development', progress: 40, points: 200 },
    { name: 'Cloud Computing Essentials', progress: 25, points: 125 },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete UI/UX module 4', points: 50, completed: false },
    { id: 2, name: 'Submit Mobile App project', points: 100, completed: false },
    { id: 3, name: 'Review cloud computing notes', points: 30, completed: false },
    { id: 4, name: 'Practice coding exercises', points: 25, completed: false },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'Completed First Course', icon: '🏆', unlocked: true },
    { id: 2, name: 'Perfect Attendance - 30 Days', icon: '🌟', unlocked: true },
    { id: 3, name: 'Skill Mastery - Programming', icon: '💻', unlocked: true },
    { id: 4, name: 'Consecutive Study Streak - 7 Days', icon: '🔥', unlocked: false },
    { id: 5, name: 'Completed 5 Courses', icon: '📚', unlocked: false },
  ]);

  // State for total points
  const [totalPoints, setTotalPoints] = useState(1700);
  const [level, setLevel] = useState(5);

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: colors.cardBg,
    backgroundGradientTo: colors.cardBg,
    color: (opacity = 1) => rgba(99, 102, 241, opacity),
    strokeWidth: 2,
    decimalPlaces: 0,
    labelColor: () => colors.lightText,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary,
      fill: colors.cardBg,
    },
  };

  // Function to complete a task
  const completeTask = (taskId) => {
    // Find the task
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1 || tasks[taskIndex].completed) return;
    
    const task = tasks[taskIndex];
    const pointsEarned = task.points;
    
    // Update the task
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...task, completed: true };
    setTasks(updatedTasks);
    
    // Update total points
    const newTotalPoints = totalPoints + pointsEarned;
    setTotalPoints(newTotalPoints);
    
    // Update level (1 level per 500 points)
    const newLevel = Math.floor(newTotalPoints / 500) + 1;
    setLevel(newLevel);
    
    // Update the chart data - increase the latest month's data
    const newSkillsData = { ...skillsData };
    const lastIndex = newSkillsData.datasets[0].data.length - 1;
    const currentValue = newSkillsData.datasets[0].data[lastIndex];
    newSkillsData.datasets[0].data[lastIndex] = Math.min(100, currentValue + (pointsEarned / 50));
    setSkillsData(newSkillsData);
    
    // Update course progress if applicable
    // For this demo, we'll update a random course when tasks are completed
    const courseIndex = Math.floor(Math.random() * courses.length);
    if (courses[courseIndex].progress < 100) {
      const updatedCourses = [...courses];
      const progressIncrease = Math.min(15, 100 - updatedCourses[courseIndex].progress);
      updatedCourses[courseIndex].progress += progressIncrease;
      updatedCourses[courseIndex].points += (progressIncrease * 5);
      setCourses(updatedCourses);
    }
    
    // Check for new achievements
    checkAchievements(newTotalPoints, updatedTasks, courses);
    
    // Show confirmation
    Alert.alert("Task Completed", `You earned ${pointsEarned} points!`);
  };
  
  // Check for new achievements
  const checkAchievements = (points, currentTasks, currentCourses) => {
    const newAchievements = [...achievements];
    
    // Check for "Consecutive Study Streak" achievement
    if (currentTasks.filter(t => t.completed).length >= 3 && !achievements[3].unlocked) {
      newAchievements[3].unlocked = true;
      Alert.alert("New Achievement", "🔥 Consecutive Study Streak - 7 Days");
    }
    
    // Check for "Completed 5 Courses" achievement
    if (currentCourses.filter(c => c.progress === 100).length >= 2 && !achievements[4].unlocked) {
      newAchievements[4].unlocked = true;
      Alert.alert("New Achievement", "📚 Completed 5 Courses");
    }
    
    setAchievements(newAchievements);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
        <View style={styles.levelContainer}>
          <Text style={[styles.levelText, { color: colors.lightText }]}>Level {level}</Text>
          <Text style={[styles.pointsText, { color: colors.primary }]}>{totalPoints} points</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Skills Development
        </Text>
        <LineChart
          data={skillsData}
          width={Dimensions.get('window').width - 48}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Pending Tasks
        </Text>
        <View style={styles.taskList}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskItem,
                { backgroundColor: task.completed ? rgba(16, 185, 129, 0.2) : colors.background }
              ]}
              onPress={() => completeTask(task.id)}
              disabled={task.completed}
            >
              <View style={styles.taskHeader}>
                <Text style={[
                  styles.taskName, 
                  { 
                    color: task.completed ? colors.success : colors.text,
                    textDecorationLine: task.completed ? 'line-through' : 'none'
                  }
                ]}>
                  {task.name}
                </Text>
                <View style={[
                  styles.pointsBadge, 
                  { backgroundColor: task.completed ? colors.success : colors.primary }
                ]}>
                  <Text style={styles.pointsBadgeText}>+{task.points}</Text>
                </View>
              </View>
              <Text style={[styles.taskStatus, { color: colors.lightText }]}>
                {task.completed ? 'Completed' : 'Tap to complete'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Courses Progress
        </Text>
        <View style={styles.courseList}>
          {courses.map((course, index) => (
            <View key={index} style={styles.courseItem}>
              <View style={styles.courseHeader}>
                <Text style={[styles.courseName, { color: colors.text }]}>
                  {course.name}
                </Text>
                <Text style={[styles.coursePoints, { color: colors.warning }]}>
                  {course.points} pts
                </Text>
              </View>
              <View style={styles.courseProgressHeader}>
                <Text style={[styles.courseProgressText, { color: colors.lightText }]}>
                  Progress
                </Text>
                <Text style={[styles.courseProgressPercentage, { color: colors.primary }]}>
                  {course.progress}%
                </Text>
              </View>
              <View style={[styles.progressBarBackground, { backgroundColor: colors.progressBg }]}>
                <View
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${course.progress}%`,
                      backgroundColor: getProgressColor(course.progress, colors)
                    }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Achievements
        </Text>
        <View style={styles.achievementsList}>
          {achievements.map((achievement, index) => (
            <View
              key={index}
              style={[
                styles.achievementItem, 
                { 
                  backgroundColor: achievement.unlocked ? rgba(99, 102, 241, 0.15) : colors.background,
                  opacity: achievement.unlocked ? 1 : 0.5
                }
              ]}
            >
              <Text style={[styles.achievementIcon]}>
                {achievement.icon}
              </Text>
              <Text style={[
                styles.achievementText, 
                { color: achievement.unlocked ? colors.text : colors.lightText }
              ]}>
                {achievement.name}
              </Text>
              {!achievement.unlocked && (
                <View style={styles.achievementLocked}>
                  <Text style={styles.achievementLockedText}>🔒</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.footer} />
    </ScrollView>
  );
}

// Helper function to get color based on progress
function getProgressColor(progress, colors) {
  if (progress < 25) return rgba(236, 72, 153, 1); // Pink
  if (progress < 50) return rgba(245, 158, 11, 1); // Amber
  if (progress < 75) return rgba(6, 182, 212, 1);  // Cyan
  return rgba(16, 185, 129, 1);                    // Emerald
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  taskList: {
    gap: 12,
  },
  taskItem: {
    padding: 16,
    borderRadius: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  taskStatus: {
    fontSize: 14,
    marginTop: 6,
  },
  pointsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  pointsBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  courseList: {
    gap: 20,
  },
  courseItem: {
    gap: 8,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  coursePoints: {
    fontSize: 14,
    fontWeight: '700',
  },
  courseProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  courseProgressText: {
    fontSize: 14,
  },
  courseProgressPercentage: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  achievementLocked: {
    marginLeft: 8,
  },
  achievementLockedText: {
    fontSize: 16,
  },
  footer: {
    height: 40,
  },
});