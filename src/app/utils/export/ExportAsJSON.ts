import * as FileSystem from "expo-file-system";
import { ItemModel } from "../../data/model/ItemModel";

export async function exportAsJSON(items: ItemModel[]) {

    let totalCompra = 0;
    const itemsComTotal = items.map(item => {
        const total = item.price * item.quantity;
        totalCompra += total;
        return { ...item, total};
    });

    const exportData = {
        items: itemsComTotal,
        totalCompra,
    };

    const json = JSON.stringify(exportData, null, 2);
    const fileUri = FileSystem.documentDirectory + "lista_itens.json";

    await FileSystem.writeAsStringAsync(fileUri, json, {
        encoding: FileSystem.EncodingType.UTF8,
    });

    return fileUri;
}