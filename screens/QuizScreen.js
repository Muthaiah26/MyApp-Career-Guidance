import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function QuizScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { career } = route.params || {};

  const normalizedTitle = career?.title.toLowerCase().replace("&", "and").trim();

  const quizBank = {
    "ai and machine learning": [
      {
        question: "What is the main goal of AI?",
        options: ["Replicating human intelligence", "Making robots", "Creating databases", "Building networks"],
        answer: "Replicating human intelligence",
      },
      {
        question: "Which AI algorithm is commonly used in self-driving cars?",
        options: ["Random Forest", "Neural Networks", "Decision Trees", "Naive Bayes"],
        answer: "Neural Networks",
      },
      {
        question: "What does NLP stand for?",
        options: ["Natural Language Processing", "Neural Language Prediction", "Network Layer Protocol", "None of these"],
        answer: "Natural Language Processing",
      },
      {
        question: "What is supervised learning?",
        options: ["Learning with labeled data", "Learning with unlabeled data", "Learning without input", "None of the above"],
        answer: "Learning with labeled data",
      },
      {
        question: "What is reinforcement learning?",
        options: ["Training a model through rewards and punishments", "Training a model with human interaction", "Building neural networks", "None of the above"],
        answer: "Training a model through rewards and punishments",
      },
      {
        question: "Which library is widely used for AI?",
        options: ["TensorFlow", "Bootstrap", "Django", "WordPress"],
        answer: "TensorFlow",
      },
      {
        question: "What does a 'bias' term do in a neural network?",
        options: ["Adjusts output", "Increases complexity", "Adds random noise", "Removes weights"],
        answer: "Adjusts output",
      },
      {
        question: "Which of these is NOT an AI domain?",
        options: ["Computer Vision", "Machine Learning", "Deep Learning", "Cloud Computing"],
        answer: "Cloud Computing",
      },
      {
        question: "What is the main drawback of AI?",
        options: ["High computation power", "Low accuracy", "Zero automation", "None of the above"],
        answer: "High computation power",
      },
      {
        question: "Which of these is a famous AI chatbot?",
        options: ["ChatGPT", "Bootstrap", "TensorFlow", "Excel"],
        answer: "ChatGPT",
      },
    ],
    "robotics engineering": [
  {
    question: "What is the primary purpose of robotics?",
    options: ["Automating tasks", "Enhancing human emotions", "Playing music", "Designing clothes"],
    answer: "Automating tasks",
  },
  {
    question: "Which component acts as the brain of a robot?",
    options: ["Motor", "Microcontroller", "Sensor", "Battery"],
    answer: "Microcontroller",
  },
  {
    question: "Which programming language is commonly used in robotics?",
    options: ["Python", "HTML", "CSS", "Photoshop"],
    answer: "Python",
  },
  {
    question: "What is the role of actuators in robots?",
    options: ["Processing data", "Providing motion", "Powering sensors", "Analyzing data"],
    answer: "Providing motion",
  },
  {
    question: "Which sensor is used for obstacle detection in robots?",
    options: ["Infrared sensor", "Microphone", "Camera", "Gyroscope"],
    answer: "Infrared sensor",
  },
  {
    question: "What is the primary advantage of robotic automation?",
    options: ["Eliminating all jobs", "Increasing efficiency", "Making robots self-aware", "Reducing data storage"],
    answer: "Increasing efficiency",
  },
  {
    question: "What is the function of a gyroscope in a robot?",
    options: ["Detecting light", "Measuring orientation", "Generating power", "Storing data"],
    answer: "Measuring orientation",
  },
  {
    question: "Which type of robot is used in manufacturing industries?",
    options: ["Humanoid", "Autonomous car", "Industrial arm", "Flying drone"],
    answer: "Industrial arm",
  },
  {
    question: "What is the purpose of machine vision in robotics?",
    options: ["To enable robots to see and interpret images", "To increase processing power", "To enhance sound detection", "To store data"],
    answer: "To enable robots to see and interpret images",
  },
  {
    question: "Which operating system is widely used for robotics applications?",
    options: ["Windows", "Linux", "ROS (Robot Operating System)", "MacOS"],
    answer: "ROS (Robot Operating System)",
  },
],

    "data science and engineering": [
  {
    question: "What is the primary goal of data science?",
    options: ["Extracting insights from data", "Developing websites", "Designing electrical circuits", "Managing databases"],
    answer: "Extracting insights from data",
  },
  {
    question: "Which programming language is most commonly used in data science?",
    options: ["Java", "C#", "Python", "Swift"],
    answer: "Python",
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Sequential Query Logic", "System Quality Language", "Software Query Level"],
    answer: "Structured Query Language",
  },
  {
    question: "Which library is widely used for data visualization in Python?",
    options: ["Pandas", "NumPy", "Matplotlib", "TensorFlow"],
    answer: "Matplotlib",
  },
  {
    question: "What is Big Data?",
    options: ["Large complex datasets", "A large computer", "High-speed internet", "A type of programming language"],
    answer: "Large complex datasets",
  },
  {
    question: "What is a data pipeline?",
    options: ["A method of processing and transferring data", "A new AI model", "A physical storage unit", "A type of programming language"],
    answer: "A method of processing and transferring data",
  },
  {
    question: "What is the primary use of machine learning in data science?",
    options: ["To predict outcomes", "To clean data", "To write emails", "To edit images"],
    answer: "To predict outcomes",
  },
  {
    question: "Which tool is commonly used for data cleaning?",
    options: ["Photoshop", "Jupyter Notebook", "Excel", "PySpark"],
    answer: "Jupyter Notebook",
  },
  {
    question: "Which algorithm is widely used for classification?",
    options: ["K-Means", "Decision Trees", "A* Search", "Bubble Sort"],
    answer:"Decision Trees",
  },
  {
    question: "Which cloud service is widely used for big data analytics?",
    options: ["AWS", "Photoshop", "Docker", "Flutter"],
    answer: "AWS",
  },
],
   "electric vehicles and data engineering": [
  {
    question: "What is the main advantage of electric vehicles?",
    options: ["Zero emissions", "Higher fuel costs", "More noise", "Heavier weight"],
    answer: "Zero emissions",
  },
  {
    question: "What type of battery is commonly used in electric vehicles?",
    options: ["Lead-acid", "Nickel-Cadmium", "Lithium-ion", "Zinc-carbon"],
    answer: "Lithium-ion",
  },
  {
    question: "Which component stores and provides energy in EVs?",
    options: ["Alternator", "Battery pack", "Exhaust pipe", "Carburetor"],
    answer: "Battery pack",
  },
  {
    question: "What is regenerative braking?",
    options: ["A way to recover energy from braking", "A type of emergency braking", "A method to increase speed", "A cooling system"],
    answer: "A way to recover energy from braking",
  },
  {
    question: "Which company is the leading EV manufacturer?",
    options: ["Tesla", "Ford", "Toyota", "Honda"],
    answer: "Tesla",
  },
  {
    question: "Which type of motor is used in most EVs?",
    options: ["Induction motor", "Diesel engine", "Rotary engine", "Steam engine"],
    answer: "Induction motor",
  },
  {
    question: "What is the range of a standard EV on a full charge?",
    options: ["200-400 miles", "50-100 miles", "600-800 miles", "1000+ miles"],
    answer: "200-400 miles",
  },
  {
    question: "Which type of charging is the fastest for EVs?",
    options: ["Level 1", "Level 2", "DC Fast Charging", "Solar Charging"],
    answer: "DC Fast Charging",
  },
  {
    question: "What is a hybrid vehicle?",
    options: ["A vehicle that uses both an engine and an electric motor", "A fully electric vehicle", "A gas-powered vehicle", "A vehicle with solar panels"],
    answer: "A vehicle that uses both an engine and an electric motor",
  },
  {
    question: "What is the primary challenge in EV adoption?",
    options: ["Battery costs", "Fuel shortages", "Lack of drivers", "Too many charging stations"],
    answer: "Battery costs",
  },
],
  "cybersecurity and ethical hacking": [
  {
    question: "What is the primary goal of cybersecurity?",
    options: [
      "Protecting digital systems and networks",
      "Creating viruses",
      "Hacking government servers",
      "Developing mobile applications"
    ],
    answer: "Protecting digital systems and networks",
  },
  {
    question: "Which tool is commonly used for penetration testing?",
    options: ["Metasploit", "Photoshop", "PowerPoint", "Excel"],
    answer: "Metasploit",
  },
  {
    question: "What does VPN stand for?",
    options: [
      "Virtual Private Network",
      "Verified Protection Network",
      "Visual Processing Node",
      "Virtual Public Network"
    ],
    answer: "Virtual Private Network",
  },
  {
    question: "What is phishing?",
    options: [
      "A technique to steal user data by pretending to be a trustworthy entity",
      "A method for encrypting files",
      "A programming language",
      "A type of firewall"
    ],
    answer: "A technique to steal user data by pretending to be a trustworthy entity",
  },
  {
    question: "Which of the following is a strong password?",
    options: [
      "123456",
      "password123",
      "P@ssw0rd!",
      "admin"
    ],
    answer: "P@ssw0rd!",
  },
  {
    question: "What does the term 'DDoS attack' stand for?",
    options: [
      "Distributed Denial of Service",
      "Data Distribution over Security",
      "Dynamic Digital Operating System",
      "Data Denial on Servers"
    ],
    answer: "Distributed Denial of Service",
  },
  {
    question: "Which of these is a common encryption algorithm?",
    options: ["AES", "JPEG", "HTML", "MP3"],
    answer: "AES",
  },
  {
    question: "What is the purpose of a firewall?",
    options: [
      "To block unauthorized access to or from a network",
      "To remove malware",
      "To boost internet speed",
      "To store passwords securely"],
      answer: "To block unauthorized access to or from a network",
  },
  {
    question: "Which of the following is NOT a type of cyber attack?",
    options: ["SQL Injection", "Man-in-the-Middle", "Phishing", "Wi-Fi Boosting"],
    answer: "Wi-Fi Boosting",
  },
  {
    question: "What certification is widely recognized for ethical hackers?",
    options: ["CEH", "CPA", "CFA", "CSS"],
    answer: "CEH",
  },

],
 "cloud computing and devops": [
  {
    question: "What is the main advantage of cloud computing?",
    options: ["Scalability", "More hardware costs", "Higher latency", "Limited storage"],
    answer: "Scalability",
  },
  {
    question: "Which of the following is a leading cloud service provider?",
    options: ["AWS", "Microsoft Paint", "Google Docs", "Firefox"],
    answer: "AWS",
  },
  {
    question: "What does SaaS stand for?",
    options: ["Software as a Service", "System and Security", "Server and Storage", "Software and System"],
    answer: "Software as a Service",
  },
  {
    question: "Which DevOps tool is used for container orchestration?",
    options: ["Kubernetes", "Git", "Jenkins", "Terraform"],
    answer: "Kubernetes",
  },
  {
    question: "Which type of cloud model allows full control over infrastructure?",
    options: ["Private Cloud", "Public Cloud", "Hybrid Cloud", "Community Cloud"],
    answer: "Private Cloud",
  },
  {
    question: "What is Infrastructure as Code (IaC)?",
    options: [
      "Managing infrastructure using code and automation",
      "A type of networking protocol",
      "A manual process for server maintenance",
      "A security vulnerability",
    ],
    answer: "Managing infrastructure using code and automation",
  },
  {
    question: "Which DevOps tool is used for Continuous Integration (CI)?",
    options: ["Jenkins", "AWS S3", "Docker", "Firebase"],
    answer: "Jenkins",
  },
  {
    question: "What is the main purpose of version control in DevOps?",
    options: [
      "Tracking code changes",
      "Managing cloud storage",
      "Encrypting data",
      "Performing manual testing",
    ],
    answer: "Tracking code changes",
  },
  {
    question: "Which cloud computing service allows users to run applications without managing servers?",
    options: ["Serverless Computing", "IaaS", "SaaS", "PaaS"],
    answer: "Serverless Computing",
  },
  {
    question: "Which DevOps practice automates software deployment?",
    options: ["CI/CD", "Penetration Testing", "Manual Deployment", "Cybersecurity"],
    answer: "CI/CD",
  },
],
};

  const questions = quizBank[normalizedTitle] || [];

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const resultAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showResult) {
      Animated.timing(resultAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  }, [showResult]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <View style={styles.container}>
      {showResult ? (
        <Animated.View style={[styles.resultContainer, { opacity: resultAnim }]}>
          <Text style={styles.resultText}>
            Quiz Score: {score} / {questions.length}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>
            {questions[currentQuestion]?.question}
          </Text>
          <View style={styles.optionsContainer}>
            {questions[currentQuestion]?.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} / {questions.length}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f0f4f7", 
    padding: 20, 
    justifyContent: "center" 
  },
  quizContainer: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 10, 
    elevation: 4, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 5 
  },
  question: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333" 
  },
  optionsContainer: { 
    marginBottom: 20 
  },
  optionButton: { 
    backgroundColor: "#0066cc", 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 5 
  },
  optionText: { 
    color: "#fff", 
    fontSize: 16, 
    textAlign: "center" 
  },
  progressText: { 
    textAlign: "center", 
    fontSize: 16, 
    color: "#666" 
  },
  resultContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  resultText: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333" 
  },
  button: { 
    backgroundColor: "#0066cc", 
    padding: 15, 
    borderRadius: 10 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});
