import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { DataBaseHelper } from "../../data/datasources/local/DataBaseHelper";
import { ItemLocalDataSource } from "../../data/datasources/local/ItemLocalDataSource";
import { ItemModel } from "../../data/model/ItemModel";

export const TestScreen = () => {
    useEffect(() => {
        const initiliazeDB = async () => {
            try {
                await DataBaseHelper.init();
            } catch (error) {
                console.log(`Erro ao criar o banco de dados: ${error}`);
            }
        };
        initiliazeDB();
    }, []);

    const saveTestData = async () => {
        const dataSource = new ItemLocalDataSource();
        try {
            const item = new ItemModel('3', 'Produto Teste', 99.99, 10);
            await dataSource.saveItem(item);
            console.log("Item salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar item:", error);
        }
    };

    return (
        <View>
            <Text>Banco de Dados Test</Text>
            <Button title="Salvar item de teste" onPress={saveTestData} />
        </View>
    );
}