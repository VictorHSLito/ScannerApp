import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import TextButton from "../components/buttons/TextButton";
import { StackParamList } from "../navigation/AppNavigator";
import { ItemLocalDataSource } from "../../data/datasources/local/ItemLocalDataSource";
import { exportAsPDF } from "../../utils/export/ExportAsPDF";
import { exportAsJSON } from "../../utils/export/ExportAsJSON";


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const dataSource = new ItemLocalDataSource();

  const handleExport = async (format: 'pdf' | 'json') => {
    try {
      const items = await dataSource.listItems();
      if (items.length === 0) {
        Alert.alert('Aviso!', 'Sua lista não contém nenhum item.');
        return;
      }

      if (format === 'pdf') {
        await exportAsPDF(items); // Função já lida com compartilhar
      } else {
        await exportAsJSON(items); // Função já lida com compartilhar
      }

      Alert.alert('Sucesso', `Arquivo exportado e compartilhado com sucesso!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível gerar ou compartilhar o arquivo.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)!</Text>
      <TextButton
        title="Cadastrar novo item"
        onPress={() => navigation.navigate('Add')}
      />

      <TextButton
        title="Visualizar lista de itens"
        onPress={() => navigation.navigate('List')}
      />

      <TextButton
        title="Salvar lista"
        onPress={() => setModalVisible(true)}
      />


      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Salvar como:</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleExport("pdf")}
            >
              <Text style={styles.modalButtonText}>PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleExport("json")}
            >
              <Text style={styles.modalButtonText}>JSON</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;