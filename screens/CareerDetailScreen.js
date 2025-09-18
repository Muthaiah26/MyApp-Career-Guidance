import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function CareerDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { career } = route.params || {};
  const title = career?.title || "Career Detail";
  const [careerDetails, setCareerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!career) return;
    let details = {};
  const titleLower = career.title.toLowerCase().replace("&","and").trim();

  switch (titleLower) {
    case "ai & machine learning":
      details = {
        overview:
          "Artificial Intelligence and Machine Learning (AI & ML) is a rapidly evolving field that uses algorithms to analyze data, make decisions, and learn from experience. It combines computer science, statistics, and data analysis to solve complex problems.",
        keySkills:
          "Python, TensorFlow, Data Analysis, Deep Learning, Natural Language Processing, Statistical Modeling",
        popularCourses:
          "Machine Learning by Andrew Ng (Coursera), AI Nanodegree (Udacity), Professional Certificate in AI (edX)",
        salaryRange: "$90,000 - $150,000 per year",
        industryOutlook:
          "The demand for AI & ML professionals is expected to grow by over 40% in the coming decade as companies integrate intelligent systems into their operations.",
        assessment:
          "Take our interactive assessment to gauge your proficiency and identify areas for improvement in AI & ML.",
        quiz:
          "Challenge your knowledge with our in-depth quiz covering various aspects of AI & ML.",
      };
      break;
    case "robotics engineering":
      details = {
        overview:
          "Robotics Engineering focuses on the design, construction, and operation of robots. It requires expertise in mechanical engineering, electronics, and computer science.",
        keySkills:
          "CAD, Python, Control Systems, Robotics, Embedded Systems",
        popularCourses:
          "Robotics Specialization (Coursera), Robotics Nanodegree (Udacity)",
        salaryRange: "$80,000 - $140,000 per year",
        industryOutlook:
          "Automation and robotics are growing industries with increasing demand in manufacturing and service sectors.",
        assessment:
          "Assess your robotics skills with our comprehensive test.",
        quiz:
          "Try our robotics fundamentals quiz to test your knowledge.",
      };
      break;
      case "data science and engineering":
        details = {
          overview:
            "Data Science and Engineering involves using scientific methods, processes, algorithms, and systems to extract insights from data. It blends statistics, programming, and domain expertise to solve complex problems.",
          keySkills:
            "Python, R, SQL, Machine Learning, Data Visualization, Hadoop, Spark",
          popularCourses:
            "IBM Data Science Professional Certificate (Coursera), Data Science Specialization (Johns Hopkins University, Coursera), Data Engineering Nanodegree (Udacity)",
          salaryRange: "$70,000 - $130,000 per year",
          industryOutlook:
            "With the exponential growth of data, demand for data scientists and engineers continues to rise across various sectors.",
          assessment:
            "Test your data manipulation, statistical, and programming skills with our interactive assessment.",
          quiz:
            "Challenge yourself with our data science fundamentals quiz.",
        };
        break;
  
      case "electric vehicles and data engineering":
        details = {
          overview:
            "Electric Vehicles and Data Engineering focuses on sustainable transportation combined with data-driven decision making. It encompasses knowledge of EV technologies, battery management, and the analysis of vehicle performance data.",
          keySkills:
            "Electrical Engineering, Battery Technology, Data Analysis, IoT, Machine Learning, MATLAB",
          popularCourses:
            "Electric Vehicle Technology (edX), Data Engineering on Google Cloud (Coursera), Battery Management Systems (Udemy)",
          salaryRange: "$75,000 - $140,000 per year",
          industryOutlook:
            "Driven by the global push for sustainability, the EV market is expanding, leading to increased demand for integrated data solutions.",
          assessment:
            "Evaluate your skills in both EV technology and data engineering with our combined assessment.",
          quiz:
            "Test your knowledge on EV systems and data integration in our focused quiz.",
        };
        break;
  
        case "cybersecurity and ethical hacking":
          details = {
            overview:
              "Cybersecurity and Ethical Hacking focuses on protecting computer systems, networks, and data from cyber threats. It involves identifying vulnerabilities, testing system defenses, and implementing robust security measures.",
            keySkills:
              "Network Security, Penetration Testing, Cryptography, Risk Analysis, Ethical Hacking Tools, Incident Response",
            popularCourses:
              "Certified Ethical Hacker (CEH) (EC-Council), Offensive Security Certified Professional (OSCP), Cybersecurity Specialization (Coursera)",
            salaryRange: "$70,000 - $130,000 per year",
            industryOutlook:
              "The cybersecurity field is growing rapidly due to increasing digital threats, with high demand for professionals skilled in ethical hacking and risk management.",
            assessment:
              "Assess your cybersecurity knowledge and ethical hacking skills with our specialized assessment.",
            quiz:
              "Test your cybersecurity expertise with our in-depth quiz.",
          };
          break;
        
        case "cloud computing and devops":
          details = {
            overview:
              "Cloud Computing and DevOps centers on leveraging cloud platforms and automation to streamline software development and operations. It emphasizes scalability, continuous integration, and efficient deployment practices.",
            keySkills:
              "AWS/Azure/GCP, Docker, Kubernetes, CI/CD, Infrastructure as Code, Scripting, Automation Tools",
            popularCourses:
              "AWS Certified Solutions Architect, Google Cloud Platform Fundamentals, DevOps Specialization (Coursera)",
            salaryRange: "$80,000 - $150,000 per year",
            industryOutlook:
              "With the rapid shift to cloud-based infrastructures, the demand for professionals in cloud computing and DevOps is rising, offering competitive salaries and dynamic career growth.",
            assessment:
              "Evaluate your cloud and DevOps competencies through our interactive assessment.",
            quiz:
              "Challenge your knowledge on cloud architectures and DevOps practices with our engaging quiz.",
          };
          break;
        
    default:
      details = {
        overview:
          "This career offers a variety of opportunities across multiple industries. Explore more details to find what suits you best.",
        keySkills: "Varies by career field",
        popularCourses: "Explore courses from top providers",
        salaryRange: "Competitive salary based on experience",
        industryOutlook:
          "Steady demand is expected in this field with emerging trends",
        assessment:
          "Take our general skills assessment to evaluate your suitability for this career.",
        quiz:
          "Test your overall knowledge with our career quiz.",
      };
  }
    setTimeout(() => {
      setCareerDetails(details);
      setLoading(false);
    }, 1000);
  }, [career, title]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: career.image }}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>

          {/* Overview Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionText}>{careerDetails.overview}</Text>
          </View>

          {/* Key Skills Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Skills</Text>
            <Text style={styles.sectionText}>{careerDetails.keySkills}</Text>
          </View>

          {/* Popular Courses Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Courses</Text>
            <Text style={styles.sectionText}>{careerDetails.popularCourses}</Text>
          </View>

          {/* Salary Range Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Salary Range</Text>
            <Text style={styles.sectionText}>{careerDetails.salaryRange}</Text>
          </View>

          {/* Industry Outlook Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Industry Outlook</Text>
            <Text style={styles.sectionText}>{careerDetails.industryOutlook}</Text>
          </View>

          {/* Skills Assessment Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills Assessment</Text>
            <Text style={styles.sectionText}>{careerDetails.assessment}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AssessmentScreen", { career })}
            >
              <Text style={styles.buttonText}>Take Skills Assessment</Text>
            </TouchableOpacity>
          </View>

          {/* Quiz Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quiz</Text>
            <Text style={styles.sectionText}>{careerDetails.quiz}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("QuizScreen", { career })}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contentContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent for readability
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0f172a",
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
