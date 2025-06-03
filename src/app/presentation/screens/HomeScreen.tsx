import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import TextButton from "../components/buttons/TextButton";
import { StackParamList } from "../navigation/AppNavigator";
import { ItemLocalDataSource } from "../../data/datasources/local/ItemLocalDataSource";
import { exportAsPDF } from "../../utils/export/ExportAsPDF";
import { exportAsJSON } from "../../utils/export/ExportAsJSON";
import { ClearListItems } from "../../domain/usecases/item/ClearListItemsUseCase";
import { SQLiteItemRepository } from "../../data/repositories/SQLiteItemRepository";


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const dataSource = new ItemLocalDataSource();
  const [clearModalVisible, setClearModalVisible] = useState(false);

  const handleExport = async (format: 'pdf' | 'json') => {
    try {
      const items = await dataSource.listItems();
      if (items.length === 0) {
        Alert.alert('Aviso!', 'Sua lista não contém nenhum item.');
        setModalVisible(false);
        return;
      }

      let fileUri = '';
      if (format === 'pdf') {
        fileUri = await exportAsPDF(items);
      } else {
        fileUri = (await exportAsJSON(items)) ?? '';
      }

      Alert.alert('Sucesso', `Arquivo salvo com sucesso.`);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível gerar o arquivo para exportação.');
      setModalVisible(false);
    }
  };

 

  const handleClearList = async () => {
    try {
      const items = await dataSource.listItems();
      if (items.length === 0) {
        Alert.alert('Aviso', 'Lista vazia!');
        setClearModalVisible(false);
        return;
      }

      const repository = new SQLiteItemRepository();
      const clearListUseCase = new ClearListItems(repository);
      await clearListUseCase.execute();

      Alert.alert('Sucesso', 'Lista limpa com sucesso!');
      setClearModalVisible(false);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível limpar a lista. Tente novamente.');
      console.error("Erro ao limpar lista:", error);
    }
  }


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

      <TextButton
        title="Limpar Lista"
        onPress={() => setClearModalVisible(true)}
      />

      <Modal
        visible={clearModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setClearModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitleClear]}>Tem certeza que deseja limpar a lista?</Text>
            <Text style={styles.modalText}>Limpando sua lista, todos os itens serão excluídos e não será possível reverter!</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleClearList}
            >
              <Text style={styles.modalButtonText}>Sim, limpar lista</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              onPress={() => setClearModalVisible(false)}
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
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 15,
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
    alignItems: "flex-start",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  modalTitleClear: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 7,
  },
  modalText: {
    fontSize: 13,
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