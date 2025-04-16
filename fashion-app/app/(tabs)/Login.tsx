import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
            <View>
                <Text style={styles.title}>Create Your Account</Text>
            </View>
            
      {/* Main Grid Box */}
      <View style={styles.cardContainer}>
        {/* Top Row */}
        <View style={styles.row}>
          <View style={styles.cardTall}><Text style={styles.cardText}>Anna</Text></View>
          <View style={styles.cardStandard}><Text style={styles.cardText}>Bella</Text></View>
          <View style={styles.cardTall}><Text style={styles.cardText}>Clara</Text></View>
        </View>

        {/* Middle Row */}
        <View style={styles.row}>
          <View style={styles.column}>
            <View className = 'm-3' style={styles.cardStandard}><Text style={styles.cardText}>Daisy</Text></View>
            <View className = 'mt-4'style={styles.cardStandard}><Text style={styles.cardText}>Holly</Text></View>
          </View>

          <View style={styles.cardLongVertical}><Text style={styles.cardText}>Eva</Text></View>

          <View style={styles.column}>
            <View style={styles.cardStandard}><Text style={styles.cardText}>Gina</Text></View>
            <View className = 'mt-4'style={styles.cardStandard}><Text style={styles.cardText}>Ivy</Text></View>
          </View>
        </View>
      </View>


      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '95%',
    height: 390, 
    overflow: 'hidden', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
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
  },
  cardStandard: {
    width: 100,
    height: 140,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cardSmall: {
    width: 80,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 50
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
