import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000/clientes';  

export default function AddClienteScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleAddCliente = async () => {
    if (!nome || !email || !telefone) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    try {
      const cliente = { nome, email, telefone };
      await axios.post(API_URL, cliente);  
      Alert.alert('Cliente cadastrado com sucesso!');
      navigation.goBack();  
    } catch (error) {
      Alert.alert('Erro ao cadastrar cliente', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
      />
      <Button title="Cadastrar Cliente" onPress={handleAddCliente} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
