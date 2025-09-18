import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Linking } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = domains.flatMap((domain) => {
      const matchingCourses = domain.courses.filter((course) =>
        course.toLowerCase().includes(query.toLowerCase())
      );
      const matchingColleges = domain.colleges.filter((college) =>
        college.name.toLowerCase().includes(query.toLowerCase())
      );

      return [
        ...matchingCourses.map((course) => ({ type: 'course', data: course, domain })),
        ...matchingColleges.map((college) => ({ type: 'college', data: college, domain })),
      ];
    });
    setResults(filteredResults);
  };

  const renderResultItem = ({ item }) => {
    if (item.type === 'course') {
      return (
        <TouchableOpacity
          style={styles.resultItem}
          onPress={() => navigation.navigate('DomainDetail', { domain: item.domain })}
        >
          <Text style={styles.courseItem}>{item.data}</Text>
        </TouchableOpacity>
      );
    } else if (item.type === 'college') {
      return (
        <TouchableOpacity
          style={styles.resultItem}
          onPress={() => navigation.navigate('CollegeDetail', { college: item.data })}
        >
          <Text style={styles.collegeName}>{item.data.name}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Trending Courses or Colleges"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  searchInput: {
    height: 40,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  resultItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  courseItem: {
    fontSize: 16,
    color: '#475569',
  },
  collegeName: {
    fontSize: 16,
    color: '#475569',
  },
});

export default SearchScreen;