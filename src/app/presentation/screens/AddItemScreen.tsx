import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { ItemController } from '../controllers/ItemController';
import { ItemModel } from '../../data/model/ItemModel';
import TextButton from '../components/buttons/TextButton';


export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const controller = new ItemController();

  const handleSave = async () => {
    try {
      const parsedPrice = parseFloat(price.replace(',', '.'));
      const parsedQuantity = parseInt(quantity)
      const item = new ItemModel(null, name, parsedPrice, parsedQuantity);
      await controller.saveItem(item);
      Alert.alert('Sucesso', 'Item salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o item.');
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Preço" style={styles.input} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder="Quantidade" style={styles.input} onChangeText={setQuantity} keyboardType="numeric" />
      <TextButton title="Salvar item" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
