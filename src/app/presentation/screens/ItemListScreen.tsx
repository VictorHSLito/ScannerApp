import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemLocalDataSource } from '../../data/datasources/local/ItemLocalDataSource';
import { ItemModel } from '../../data/model/ItemModel';
import { ItemController } from '../controllers/ItemController';
import IconButton from '../components/buttons/IconButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../navigation/AppNavigator';


const ItemListScreen = () => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList, 'List'>>();

  const controller = new ItemController;

  const fetchItems = async () => {
    try {
      const dataSource = new ItemLocalDataSource();
      const itemsFromDb = await dataSource.listItems();
      console.log("Items carregados: ", itemsFromDb);
      setItems(itemsFromDb);
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  const renderItem = ({ item }: { item: ItemModel }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>Nome: {item.name}</Text>
        <Text style={styles.itemText}>Preço: R$ {item.price.toFixed(2)}</Text>
        <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
        <Text style={styles.itemText}>Total: R$ {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          icon="edit"
          onPress={() => navigation.navigate('Edit', { item })}
        />
        <IconButton
          icon="delete"
          onPress={() => controller.deleteItem(String(item.id))}
        />
      </View>
    </View>

  );

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />

      <View style={styles.fab}>
        <Text style={styles.fabText}> Total: R$ {total.toFixed(2)} </Text>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  itemInfo: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ItemListScreen;
