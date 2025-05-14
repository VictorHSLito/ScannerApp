import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ItemLocalDataSource } from '../../data/datasources/local/ItemLocalDataSource';
import { ItemModel } from '../../data/model/ItemModel';
import { ItemController } from '../controllers/ItemController';
import IconButton from '../components/buttons/IconButton';

const ItemListScreen = () => {
  const [items, setItems] = useState<ItemModel[]>([]);

  const controller = new ItemController;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const dataSource = new ItemLocalDataSource();
        const itemsFromDb = await dataSource.listItems();
        setItems(itemsFromDb); // Armazena os itens no estado
      } catch (error) {
        console.error("Erro ao carregar os itens:", error);
      }
    };

    fetchItems(); // Carrega os itens assim que a tela for renderizada
  }, []); // Esse efeito será executado uma vez, quando o componente for montado

  const renderItem = ({ item }: { item: ItemModel }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>Nome: {item.name}</Text>
        <Text style={styles.itemText}>Preço: R$ {item.price}</Text>
        <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
        <Text style={styles.itemText}>Total: R$ {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <IconButton
        icon="edit"
        onPress={() => controller.deleteItem(String(item.id))}
      />
      <IconButton
        icon="delete"
        onPress={() => controller.deleteItem(String(item.id))}
      />
    </View>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ItemListScreen;
