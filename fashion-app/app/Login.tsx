import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("./HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <View style={styles.cardContainer}>
        {/* Top Row */}
        <View style={styles.row}>
          <View style={styles.cardTall}><Text style={styles.cardText}>Anna</Text></View>
          <View style={styles.cardStandard}><Text style={styles.cardText}>Bella</Text></View>
          <View style={styles.cardTall}><Text style={styles.cardText}>Clara</Text></View>
          <View style={styles.cardSmall}><Text style={styles.cardText}>Luna</Text></View>
        </View>

        {/* Middle Row */}
        <View style={styles.row}>
          {/* Left Column: Daisy + Hana */}
          <View style={styles.column}>
            <View style={styles.cardTall}><Text style={styles.cardText}>Daisy</Text></View>
            <View style={styles.cardPeek}><Text style={styles.cardText}>Hana</Text></View>
          </View>

          {/* Center: Eva */}
          <View style={styles.cardLongVertical}><Text style={styles.cardText}>Eva</Text></View>

          {/* Right Column: Gina + Isla */}
          <View style={styles.column}>
            <View style={styles.cardStandard}><Text style={styles.cardText}>Gina</Text></View>
            <View style={styles.cardPeek}><Text style={styles.cardText}>Isla</Text></View>
          </View>
        </View>
      </View>

      {/* Google Auth Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleContinue}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Apple Auth Button */}
      <TouchableOpacity style={styles.appleButton}>
        <Text style={styles.appleButtonText}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    height: 430,
    width: '90%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    transform: [{ scale: 0.95 }],
    alignSelf: 'center',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  column: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardTall: {
    width: 100,
    height: 180,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  cardStandard: {
    width: 100,
    height: 160,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  cardSmall: {
    width: 80,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  cardLongVertical: {
    width: 120,
    height: 220,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cardPeek: {
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    transform: [{ translateY: 30 }],
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
  },
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 300,
    alignItems: 'center',
  },
  appleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
