import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AssessmentScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { career } = route.params || {};

  const questionBank = {
    "AI & Machine Learning": [
      {
        question: "What does AI stand for?",
        options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Internet", "Applied Innovation"],
        answer: "Artificial Intelligence",
      },
      {
        question: "Which language is primarily used for AI development?",
        options: [ "JavaScript", "Ruby","Python", "Java"],
        answer: "Python",
      },
      {
        question: "What is a neural network?",
        options: ["A network of neurons", "A series of algorithms mimicking the human brain", "A computer network", "A social network"],
        answer: "A series of algorithms mimicking the human brain",
      },
      {
        question: "Which library is popular for deep learning?",
        options: [ "React", "Angular", "Django","TensorFlow",],
        answer: "TensorFlow",
      },
      {
        question: "What is machine learning?",
        options: [ "A way to manually code AI","A subset of AI that uses statistical techniques", "A hardware component", "None of the above"],
        answer: "A subset of AI that uses statistical techniques",
      },
      {
        question: "Which algorithm is used for classification?",
        options: [ "Sorting", "Compression", "Encryption","Decision Tree"],
        answer: "Decision Tree",
      },
      {
        question: "Which concept is essential for model evaluation?",
        options: [ "Inflation","Overfitting", "Deflation", "Stability"],
        answer: "Overfitting",
      },
      {
        question: "Which metric is commonly used for classification models?",
        options: [ "Voltage", "Speed","Accuracy", "Throughput"],
        answer: "Accuracy",
      },
      {
        question: "What is a common activation function in neural networks?",
        options: [ "Modulus", "Logarithm", "Exponential","ReLU"],
        answer: "ReLU",
      },
      {
        question: "Which technique is used to prevent overfitting?",
        options: ["Dropout", "Boosting", "Averaging", "Normalization"],
        answer: "Dropout",
      },
    ],
    "Robotics Engineering": [
      {
        question: "What is the primary role of a Robotics Engineer?",
        options: [
          "Developing software applications",
          "Designing robots and automated systems",
          "Creating digital marketing strategies",
          "Managing IT infrastructure"
        ],
        answer: "Designing robots and automated systems",
      },
      {
        question: "Which programming language is widely used in robotics?",
        options: [ "JavaScript","Python", "PHP", "Ruby"],
        answer: "Python",
      },
      {
        question: "Which sensor is commonly used in robotics for distance measurement?",
        options: [
          "Temperature sensor",
          "Pressure sensor",
          "Ultrasonic sensor",
          "Humidity sensor"
        ],
        answer: "Ultrasonic sensor",
      },
      {
        question: "What does PID in control systems stand for?",
        options: [
          "Proportional-Integral-Derivative",
          "Positive-Impulse-Duration",
          "Proportional-Interference-Damping",
          "Power-Increase-Dynamics"
        ],
        answer: "Proportional-Integral-Derivative",
      },
      {
        question: "Which robotics middleware is commonly used for robot control?",
        options: ["ROS", "Bootstrap", "Django", "Flask"],
        answer: "ROS",
      },
      {
        question: "What is the main advantage of using machine vision in robotics?",
        options: [
          "Enhanced perception and navigation",
          "Increased battery life",
          "Reduced cost",
          "Faster internet connectivity"
        ],
        answer: "Enhanced perception and navigation",
      },
      {
        question: "Which type of actuator is commonly used in robotic arms?",
        options: [
          "Servo motor",
          "Hydraulic pump",
          "Refrigeration compressor",
          "Wind turbine"
        ],
        answer: "Servo motor",
      },
      {
        question: "What is kinematics in robotics?",
        options: [
          "Study of motion without regard to forces",
          "Study of forces and torques",
          "Design of mechanical systems",
          "Programming of control systems"
        ],
        answer: "Study of motion without regard to forces",
      },
      {
        question: "Which material is commonly used in lightweight robot construction?",
        options: [ "Lead", "Steel", "Concrete","Aluminum"],
        answer: "Aluminum",
      },
      {
        question: "What is the purpose of a gripper in robotics?",
        options: [
          "To power the robot",
          "To provide mobility",
          "To manipulate objects",
          "To serve as a sensor"
        ],
        answer: "To manipulate objects",
      },
    ],
    "Data Science and Engineering": [
      {
        question: "What is the primary purpose of data science?",
        options: [
          "Extracting insights from data",
          "Building mobile apps",
          "Designing websites",
          "Managing hardware infrastructure"
        ],
        answer: "Extracting insights from data",
      },
      {
        question: "Which programming language is most popular in data science?",
        options: [ "C#", "Swift","Python", "JavaScript"],
        answer: "Python",
      },
      {
        question: "What is the function of a data engineer?",
        options: [
          "Creating user interfaces",
          "Developing mobile apps",
          "Managing server hardware",
          "Building and maintaining data pipelines"
        ],
        answer: "Building and maintaining data pipelines",
      },
      {
        question: "Which tool is used for big data processing?",
        options: ["Photoshop","Apache Spark",  "WordPress", "React"],
        answer: "Apache Spark",
      },
      {
        question: "What does ETL stand for?",
        options: [
          "Extract, Transform, Load",
          "Enter, Transform, Leave",
          "Execute, Transfer, Log",
          "Extract, Transmit, Listen"
        ],
        answer: "Extract, Transform, Load",
      },
      {
        question: "What is a common data visualization tool?",
        options: ["Tableau", "Excel", "Notepad", "Word"],
        answer: "Tableau",
      },
      {
        question: "Which NoSQL database is known for its high scalability?",
        options: [ "SQLite", "PostgreSQL","Cassandra", "MariaDB"],
        answer: "Cassandra",
      },
      {
        question: "What is supervised learning?",
        options: [
          "Machine learning with labeled data",
          "Learning without any labels",
          "A method for unsupervised clustering",
          "Data storage technique"
        ],
        answer: "Machine learning with labeled data",
      },
      {
        question: "Which method is used for dimensionality reduction?",
        options: [
          "Principal Component Analysis",
          "Linear Regression",
          "K-Means Clustering",
          "Decision Trees"
        ],
        answer: "Principal Component Analysis",
      },
      {
        question: "What is a common metric to evaluate classification models?",
        options: [ "Profit", "Speed","Accuracy", "Temperature"],
        answer: "Accuracy",
      },
    ],
    "Electric Vehicles and Data Engineering": [
      {
        question: "What is the primary advantage of electric vehicles?",
        options: [
          "Reduced emissions",
          "Higher fuel consumption",
          "Increased noise",
          "Lower efficiency"
        ],
        answer: "Reduced emissions",
      },
      {
        question: "Which component is critical in electric vehicles for energy storage?",
        options: [ "Engine","Battery", "Gearbox", "Carburetor"],
        answer: "Battery",
      },
      {
        question: "What does EV stand for?",
        options: [
          "Electronic Vehicle",
          "Energized Vehicle",
          "Engineered Vehicle",
          "Electric Vehicle"
        ],
        answer: "Electric Vehicle",
      },
      {
        question: "Which type of battery is most commonly used in modern EVs?",
        options: ["Lithium-ion", "Lead-acid", "Nickel-Cadmium", "Alkaline"],
        answer: "Lithium-ion",
      },
      {
        question: "What is the role of data engineering in the EV industry?",
        options: [
          "Designing car aesthetics",
          "Manufacturing tires",
          "Sales forecasting exclusively",
          "Analyzing vehicle performance data",
        ],
        answer: "Analyzing vehicle performance data",
      },
      {
        question: "Which metric is important for EV battery performance?",
        options: ["Energy density", "Color", "Size", "Weight only"],
        answer: "Energy density",
      },
      {
        question: "What is regenerative braking?",
        options: [
          "A technique for faster acceleration",
          "A method to recharge the battery during braking",
          "A way to increase tire grip",
          "A noise reduction method"
        ],
        answer: "A method to recharge the battery during braking",
      },
      {
        question: "Which technology is used for vehicle data communication?",
        options: ["CAN Bus", "HTTP", "Bluetooth only", "Wi-Fi exclusively"],
        answer: "CAN Bus",
      },
      {
        question: "What is the primary challenge in EV infrastructure?",
        options: [
          "Finding parking spots",
          "Increasing vehicle color options",
          "Improving tire quality",
          "Building sufficient charging stations"
        ],
        answer: "Building sufficient charging stations",
      },
      {
        question: "How does data engineering help in EV maintenance?",
        options: [
          "Predictive maintenance using sensor data",
          "Designing new car models",
          "Manufacturing batteries",
          "Improving paint quality"
        ],
        answer: "Predictive maintenance using sensor data",
      },
    ],
    " Cybersecurity and Ethical Hacking": [
      {
        question: "What is the primary goal of ethical hacking?",
        options: [
          "Causing system failures",
          "Stealing data",
          "Identifying vulnerabilities",
          "Monitoring users"
        ],
        answer: "Identifying vulnerabilities",
      },
      {
        question: "Which tool is widely used for vulnerability scanning?",
        options: [ "Photoshop","Nmap", "Excel", "PowerPoint"],
        answer: "Nmap",
      },
      {
        question: "What does SQL Injection target?",
        options: ["Databases", "Web servers", "Email servers", "Network switches"],
        answer: "Databases",
      },
      {
        question: "Which protocol secures data transfer over the internet?",
        options: [ "HTTP", "FTP", "Telnet","HTTPS"],
        answer: "HTTPS",
      },
      {
        question: "What is two-factor authentication (2FA)?",
        options: [
          "An extra layer of security requiring two forms of verification",
          "A single password",
          "A firewall rule",
          "A type of encryption"
        ],
        answer: "An extra layer of security requiring two forms of verification",
      },
      {
        question: "What is a zero-day vulnerability?",
        options: [
          "A vulnerability unknown to the vendor",
          "A vulnerability that has been patched",
          "A known bug",
          "A type of malware"
        ],
        answer: "A vulnerability unknown to the vendor",
      },
      {
        question: "Which tool can be used for password cracking?",
        options: ["John the Ripper", "Adobe Reader", "Notepad", "Chrome"],
        answer: "John the Ripper",
      },
      {
        question: "What does VPN stand for?",
        options: [
          "Virtual Public Network",
          "Virtual Private Network",
          "Verified Private Network",
          "Variable Private Network"
        ],
        answer: "Virtual Private Network",
      },
      {
        question: "What is social engineering in cybersecurity?",
        options: [
          "Installing antivirus software",
          "Encrypting data",
          "Monitoring network traffic",
          "Manipulating people to divulge confidential information"
        ],
        answer: "Manipulating people to divulge confidential information",
      },
      {
        question: "Which certification is popular for ethical hacking?",
        options: ["MBA", "CEH", "CPA", "CISSP"],
        answer: "CEH",
      },
    ],
    " Cloud Computing and DevOps": [
      {
        question: "What is cloud computing?",
        options: [
          "Delivering computing services over the internet",
          "Storing data on local servers",
          "A type of programming language",
          "A hardware device"
        ],
        answer: "Delivering computing services over the internet",
      },
      {
        question: "Which company is known for its cloud platform AWS?",
        options: [ "Google", "Microsoft", "IBM","Amazon"],
        answer: "Amazon",
      },
      {
        question: "What does DevOps primarily focus on?",
        options: [
          "Marketing and sales",
          "Graphic design",
          "Hardware manufacturing",
          "Integration of development and operations"
        ],
        answer: "Integration of development and operations",
      },
      {
        question: "What is containerization?",
        options: [
          "Packaging applications into containers",
          "A method of shipping goods",
          "Storing data in databases",
          "A networking protocol"
        ],
        answer: "Packaging applications into containers",
      },
      {
        question: "Which tool is commonly used for container orchestration?",
        options: ["Docker Compose","Kubernetes", "Apache", "Nginx"],
        answer: "Kubernetes",
      },
      {
        question: "What is CI/CD in DevOps?",
        options: [
          "Code Inspection and Code Debugging",
          "Continuous Integration and Continuous Delivery",
          "Customer Interaction and Client Development",
          "Command Input and Command Deployment"
        ],
        answer: "Continuous Integration and Continuous Delivery",
      },
      {
        question: "Which configuration management tool is popular in DevOps?",
        options: ["Photoshop", "WordPress","Ansible",  "Excel"],
        answer: "Ansible",
      },
      {
        question: "What does IaaS stand for?",
        options: [
          "Infrastructure as a Service",
          "Internet as a Service",
          "Information as a Service",
          "Integration as a Service"
        ],
        answer: "Infrastructure as a Service",
      },
      {
        question: "Which cloud service model focuses on application deployment without managing underlying infrastructure?",
        options: [ "IaaS", "PaaS","SaaS", "DaaS"],
        answer: "PaaS",
      },
      {
        question: "What is the main benefit of using DevOps practices?",
        options: [
          "Faster development and deployment",
          "Increased software costs",
          "Longer release cycles",
          "Reduced collaboration"
        ],
        answer: "Faster development and deployment",
      },
    ],
  };

  const questions = questionBank[career?.title] || [];

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
      setScore((prev) => prev + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <View style={styles.container}>
      {showResult ? (
        <Animated.View style={[styles.resultContainer, { opacity: resultAnim }]}>
          <Text style={styles.resultText}>Final Score: {score} / {questions.length}</Text>
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
