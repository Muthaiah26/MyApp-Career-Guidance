import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  useColorScheme,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const trendingCareers = [
  {
    id: '1',
    title: 'AI & Machine Learning',
    image: 'https://nietm.in/wp-content/uploads/2022/12/AI2.jpg',
    description: 'This rapidly growing field focuses on designing intelligent systems capable of learning and adapting.It encompasses subfields such as deep learning, reinforcement learning, natural language processing, and computer vision.  ',
  },
  {
    id: '2',
    title: 'Robotics Engineering',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRehS6_F1n7Xfv3fUZO7dQpJxOXMlAu5OOYQ&s',
    description: 'This specialization deals with the design, construction, and maintenance of robots, requiring knowledge in data analysis, computer science, and electronics.',
  },
  {
    id: '3',
    title: 'Data Science and Engineering',
    image: 'https://cdn.analyticsvidhya.com/wp-content/uploads/2023/04/Data-Science-Innovations.jpeg',
    description: 'This field involves analyzing complex data sets to solve business problems, equipping students with skills in data mining, statistical modeling, and predictive analytics.',
  },
  {
    id: '4',
    title: 'Electric Vehicles and Data Engineering',
    image: 'https://iicteducation.com/wp-content/uploads/2023/09/blog2.jpeg',
    description: 'Certificate courses in electric vehicles and data engineering address the shift towards sustainable transportation and the increasing importance of data management. '
  },
  {
    id: '5',
    title: ' Cybersecurity and Ethical Hacking',
    image: 'https://emeritus.org/in/wp-content/uploads/sites/3/2022/07/ethical-hacking.jpg.optimal.jpg',
    description: 'Cybersecurity and Ethical Hacking is a highly in-demand field focused on protecting computer systems, networks, and data from cyber threats. Ethical hacking involves identifying vulnerabilities in systems and fixing them before malicious hackers exploit them.'
  },
  {
    id: '6',
    title: ' Cloud Computing and DevOps',
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Mastering_The_Future_With_A_Master_Degree_In_Cloud_Computing.jpg',
    description: 'Cloud Computing and DevOps are essential in modern IT infrastructure, enabling scalable, automated, and efficient software development and deployment. Cloud Computing focuses on delivering computing services like servers, storage, and networking over the internet'
  }
 

];

const careerFields = [
  {
    id: '1',
    title: 'Engineering',
    icon: 'build-outline',
    color: '#6366f1',
    colleges: [
      { name: 'Indian Institute of Technology Madras (IIT Madras)', url: 'https://www.iitm.ac.in/', nirfRank: 1 },
      { name: 'Madras Institute of Technology', url: 'https://mitindia.edu/', nirfRank: 15 },
      { name: 'College of Engineering, Guindy', url: 'https://ceg.annauniv.edu/', nirfRank: 12 },
      { name: 'SSN College of Engineering', url: 'https://www.ssn.edu.in/', nirfRank: 25 },
      { name: 'National Institute of Technology (NIT), Tiruchirappalli', url: 'https://www.nitt.edu/', nirfRank: 9 },
      { name: 'Chennai Institute of Technology', url: 'https://www.citchennai.edu.in/', nirfRank: 50 },
      { name: 'PSG College of Technology, Coimbatore', url: 'https://www.psgtech.edu/', nirfRank: 67 },
      { name: 'Thiagarajar College of Engineering, Madurai', url: 'https://www.tce.edu/', nirfRank: 30 },
      { name: 'Coimbatore Institute Of Technology', url: 'https://www.cit.edu.in/', nirfRank: 40 },
      { name: 'Vellore Institute of Technology', url: 'https://vit.ac.in/', nirfRank: 11 },
    ],
  },
  {
    id: '2',
    title: 'Medical',
    icon: 'medical-outline',
    color: '#ec4899',
    colleges: [
      { name: 'Madras Medical College (MMC), Chennai', url: 'https://www.tnmgrmu.ac.in/', nirfRank: 5 },
      { name: 'Christian Medical College (CMC), Vellore', url: 'https://www.cmch-vellore.edu/', nirfRank: 2 },
      { name: 'Stanley Medical College (SMC), Chennai', url: 'https://www.stanleymedicalcollege.ac.in/', nirfRank: 8 },
      { name: 'Government Kilpauk Medical College (GKMC), Chennai', url: 'https://www.gkmc.ac.in/', nirfRank: 10 },
      { name: 'PSG Institute of Medical Sciences and Research, Coimbatore', url: 'https://www.psgimsr.ac.in/', nirfRank: 15 },
      { name: 'Sri Ramachandra Medical College and Research Institute (SRMC), Chennai', url: 'https://www.sriramachandra.edu.in/', nirfRank: 20 },
      { name: 'Saveetha Medical College, Chennai', url: 'https://www.saveethamedicalcollege.com/', nirfRank: 25 },
      { name: 'Coimbatore Medical College (CMC), Coimbatore', url: 'https://www.cmccbe.ac.in/', nirfRank: 30 },
      { name: 'Government Mohan Kumaramangalam Medical College, Salem', url: 'https://gmkmc.ac.in/', nirfRank: 35 },
      { name: 'Madurai Medical College (MMC), Madurai', url: 'http://www.mdmc.ac.in/', nirfRank: 40 },
    ],
  },
  {
    id: '3',
    title: 'Arts',
    icon: 'color-palette-outline',
    color: '#10b981',
    colleges: [
      { name: 'Loyola College, Chennai', url: 'https://www.loyolacollege.edu/', nirfRank: 5 },
      { name: 'Madras Christian College (MCC), Chennai', url: 'https://mcc.edu.in/', nirfRank: 10 },
      { name: 'Stella Maris College, Chennai', url: 'https://stellamariscollege.edu.in/', nirfRank: 15 },
      { name: 'Ethiraj College for Women, Chennai', url: 'https://ethirajcollege.edu.in/', nirfRank: 20 },
      { name: 'PSG College of Arts and Science, Coimbatore', url: 'https://www.psgcas.ac.in/', nirfRank: 25 },
      { name: 'Women’s Christian College (WCC), Chennai', url: 'https://wcc.edu.in/', nirfRank: 30 },
      { name: 'Presidency College, Chennai', url: 'https://www.presidencycollegechennai.ac.in/', nirfRank: 35 },
      { name: 'Kongunadu Arts and Science College, Coimbatore', url: 'https://www.kongunaducollege.ac.in/', nirfRank: 40 },
      { name: 'Bishop Heber College, Tiruchirappalli', url: 'https://bhc.edu.in/', nirfRank: 45 },
      { name: 'The American College, Madurai', url: 'https://americancollege.edu.in/', nirfRank: 50 },
    ],
  },
  {
    id: '4',
    title: 'Diploma',
    icon: 'school-outline',
    color: '#f59e0b',
    colleges: [
      { name: 'Central Polytechnic College, Chennai', url: 'http://www.cptchennai.ac.in/', nirfRank: 5 },
      { name: 'Government Polytechnic College, Coimbatore', url: 'https://www.gptcbe.ac.in/', nirfRank: 10 },
      { name: 'Government Polytechnic College, Chennai', url: 'https://www.tngptc.in/', nirfRank: 15 },
      { name: 'Hindustan Institute of Technology and Science (HITS), Chennai', url: 'https://hindustanuniv.ac.in/', nirfRank: 20 },
      { name: 'Sri Ramakrishna Polytechnic College, Coimbatore', url: 'https://www.srptc.ac.in/', nirfRank: 25 },
      { name: 'Thiagarajar Polytechnic College, Salem', url: 'https://www.tpt.edu.in/', nirfRank: 30 },
      { name: 'Vels Institute of Science, Technology & Advanced Studies (VISTAS), Chennai', url: 'https://vistas.ac.in/', nirfRank: 35 },
      { name: 'Alagappa Polytechnic College, Karaikudi', url: 'http://www.alagappapolytechnic.edu.in/', nirfRank: 40 },
      { name: 'Government Polytechnic College for Women, Coimbatore', url: 'https://www.gptcwcbe.org/', nirfRank: 45 },
      { name: 'Kongu Polytechnic College, Erode', url: 'https://www.kongu.ac.in/', nirfRank: 50 },
    ],
  },
];

export default function ExploreScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedField, setSelectedField] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleFieldPress = (field) => {
    setSelectedField((prevField) => (prevField?.id === field.id ? null : field));
  };

  const openCollegeURL = (url) => {
    Linking.openURL(url);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = careerFields.flatMap((field) =>
        field.colleges.filter((college) =>
          college.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#1a1b1e' : '#f8fafc' }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
          Career Explorer
        </Text>
        <Text style={[styles.subGreeting, { color: isDark ? '#94a3b8' : '#64748b' }]}>
          Let's explore your future career path
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: isDark ? '#27272a' : '#ffffff' }]}>
          <Ionicons name="search" size={20} color={isDark ? '#94a3b8' : '#64748b'} />
          <TextInput
            style={[styles.searchText, { color: isDark ? '#94a3b8' : '#64748b' }]}
            placeholder="Search careers, skills, or courses"
            placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {searchQuery && (
        <View style={styles.searchResultsContainer}>
          {searchResults.map((college, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.collegeItem, { backgroundColor: isDark ? '#27272a' : '#ffffff' }]}
              onPress={() => openCollegeURL(college.url)}
            >
              <Text style={[styles.collegeText, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
                {college.name} (NIRF Rank: {college.nirfRank})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={[styles.sectionTitle, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
        Trending Careers
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingContainer}>
        {trendingCareers.map((career) => (
          <TouchableOpacity
            key={career.id}
            style={styles.trendingCard}
            onPress={() => navigation.navigate("CareerDetail", { career })}
          >
            <Image source={{ uri: career.image }} style={styles.trendingImage} />
            <View style={styles.trendingContent}>
              <Text style={styles.trendingTitle}>{career.title}</Text>
              <Text style={styles.trendingDescription}>{career.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.sectionTitle, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
        Explore Career Fields
      </Text>
      <View style={styles.fieldsGrid}>
        {careerFields.map((field) => (
          <TouchableOpacity
            key={field.id}
            style={[styles.fieldCard, { backgroundColor: isDark ? '#27272a' : '#ffffff' }]}
            onPress={() => handleFieldPress(field)}
          >
            <LinearGradient
              colors={[field.color, `${field.color}80`]}
              style={styles.iconContainer}
            >
              <Ionicons name={field.icon} size={24} color="#ffffff" />
            </LinearGradient>
            <Text style={[styles.fieldTitle, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
              {field.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedField && (
        <View style={styles.collegesContainer}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
            Top Colleges for {selectedField.title}
          </Text>
          {selectedField.colleges.map((college, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.collegeItem, { backgroundColor: isDark ? '#27272a' : '#ffffff' }]}
              onPress={() => openCollegeURL(college.url)}
            >
              <Text style={[styles.collegeText, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
                {college.name} (NIRF Rank: {college.nirfRank})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  searchResultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  trendingContainer: {
    paddingLeft: 20,
    marginBottom: 24,
  },
  trendingCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  trendingImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  trendingContent: {
    padding: 16,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0f172a',
  },
  trendingDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  fieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  fieldCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  collegesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  collegeItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  collegeText: {
    fontSize: 16,
    fontWeight: '500',
  },
});