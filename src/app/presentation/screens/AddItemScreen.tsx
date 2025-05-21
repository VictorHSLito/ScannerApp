import React, { useState, useEffect } from 'react';
import {
  View, TextInput, StyleSheet, Alert,
  TouchableOpacity, Modal, Text
} from 'react-native';
import { ItemController } from '../controllers/ItemController';
import { ItemModel } from '../../data/model/ItemModel';
import TextButton from '../components/buttons/TextButton';


import { useScanPrice } from '../hooks/useScanPrice';
import { Camera } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome';



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


  const [scanning, setScanning] = useState(false);
  const { price: scannedPrice, hasPermission, device, frameProcessor } = useScanPrice();

  // Quando o hook detectar um preço, atualiza o input e fecha câmera
  useEffect(() => {
    if (scannedPrice) {
      setPrice(scannedPrice);
      setScanning(false);
    }
  }, [scannedPrice]);

  const handleScanPress = () => {
    if (!hasPermission) {
      Alert.alert('Permissão necessária', 'Permita o uso da câmera nas configurações.');
      return;
    }
    if (!device) {
      Alert.alert('Erro', 'Nenhuma câmera disponível.');
      return;
    }
    setScanning(true);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Preço" style={styles.input} 
      onChangeText={setPrice} keyboardType="numeric" /> 
      
            <View style={styles.inputContainer}>
        <TextInput
          placeholder="Preço"
          style={styles.inputWithButton}
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleScanPress} style={styles.scanButton}>
          <Icon name="camera" size={20} color="#555" />
        </TouchableOpacity>
      </View>
      
      
      
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



  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  inputWithButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    paddingRight: 40,
    borderRadius: 5,
  },
  scanButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#00000080',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});
