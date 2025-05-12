import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ItemModel } from '../../../data/model/ItemModel';

type Props = {
    item: ItemModel;
};

const ItemCard: React.FC<Props> = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>
    <Text>Preço: R$ {item.price.toFixed(2)}</Text>
    <Text>Quantidade: {item.quantity}</Text>
    <Text>Total: R$ {item.price * item.quantity}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ItemCard;