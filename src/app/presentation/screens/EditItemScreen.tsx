import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { ItemModel } from '../../data/model/ItemModel';
import TextButton from '../components/buttons/TextButton';
import { ItemController } from '../controllers/ItemController';
import { StackParamList } from '../navigation/AppNavigator';

export default function EditItemScreen() {
  const route = useRoute<RouteProp<StackParamList, 'Edit'>>();
  const { item } = route.params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const controller = new ItemController();

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toFixed(2).replace('.', ','));
      setQuantity(String(item.quantity));
    }
  }, [item]);

  const handleUpdate = async () => {
    try {
      const parsedPrice = parseFloat(price.replace(',', '.'));
      const parsedQuantity = parseInt(quantity);
      const updatedItem = new ItemModel(item.id, name, parsedPrice, parsedQuantity);
      // await controller.saveItem(updatedItem); TROCAR ESSE MÉTODO PARA O UPDATE
      Alert.alert('Sucesso', 'Item atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o item.');
      console.error('Erro ao atualizar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder={item.name} style={styles.input} onChangeText={setName} />
      <TextInput placeholder={item.price.toFixed(2)} style={styles.input} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder={String(item.quantity)} style={styles.input} onChangeText={setQuantity} keyboardType="numeric" />
      <TextButton title="Editar Item" onPress={handleUpdate} />
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
