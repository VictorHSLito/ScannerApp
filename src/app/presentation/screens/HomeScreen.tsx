import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextButton from "../components/buttons/TextButton";
import { StackParamList } from "../navigation/AppNavigator";


const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <TextButton
        title="Cadastrar novo item"
        onPress={() => navigation.navigate('Add')}
      />

      <TextButton
        title="Visualizar lista de itens"
        onPress={() => navigation.navigate('List')}
      />
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
});

export default HomeScreen;