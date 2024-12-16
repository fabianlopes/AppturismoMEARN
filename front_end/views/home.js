import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.0.17:5000/clientes'; 

export default function HomeScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(API_URL); 
      setClientes(response.data); 
    } catch (error) {
      console.error("Erro ao carregar clientes", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item._id}  
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.telefone}</Text>
          </View>
        )}
      />
      <Button
        title="Adicionar Cliente"
        onPress={() => navigation.navigate('AddCliente')}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});