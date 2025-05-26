import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ItemModel } from '../../data/model/ItemModel';
import { Alert } from 'react-native';

export async function exportAsJSON(items: ItemModel[]) {
  console.log('Iniciando exportação JSON...');

  let totalCompra = 0;
  const itemsComTotal = items.map((item) => {
    const total = item.price * item.quantity;
    totalCompra += total;
    return { ...item, total };
  });

  const exportData = { items: itemsComTotal, totalCompra };
  const json = JSON.stringify(exportData, null, 2);

  const fileUri = FileSystem.cacheDirectory + 'lista_itens.json';
  console.log('Escrevendo JSON temporário em:', fileUri);
  await FileSystem.writeAsStringAsync(fileUri, json, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (!(await Sharing.isAvailableAsync())) {
    Alert.alert('Aviso', 'O compartilhamento não está disponível neste dispositivo.');
    return;
  }

  console.log('Abrindo diálogo de compartilhamento...');
  await Sharing.shareAsync(fileUri, {
    mimeType: 'application/json',
    dialogTitle: 'Compartilhar Lista de Itens (JSON)',
  });

  console.log('Exportação concluída e compartilhada.');
}
