import { ItemModel } from '../../data/model/ItemModel';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

export async function exportAsPDF(items: ItemModel[]) {
  console.log('Iniciando exportação PDF...');

  let totalCompra = 0;
  const rows = items.map((item) => {
    const total = item.price * item.quantity;
    totalCompra += total;
    return `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const html = `
    <html>
      <body>
        <h1>Lista de Itens</h1>
        <table border="1" cellspacing="0" cellpadding="4">
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
          ${rows}
        </table>
        <h3>Total da Compra: R$ ${totalCompra.toFixed(2)}</h3>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  console.log('PDF gerado em:', uri);

  // Compartilhar diretamente com outros apps ou salvar em Downloads
  await saveFileToDownloads(uri, `lista_itens_${Date.now()}.pdf`);

  return uri;
}

async function saveFileToDownloads(fileUri: string, fileName: string) {
  if (Platform.OS === 'android') {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert('Permissão negada', 'Não foi possível obter permissão para acessar o armazenamento.');
        return;
      }

      // Cria um novo arquivo no diretório Downloads
      const fileUriInDownload = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/pdf'
      );

      // Copia o conteúdo para esse novo arquivo público
      const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      await FileSystem.writeAsStringAsync(fileUriInDownload, fileContent, { encoding: FileSystem.EncodingType.Base64 });

      Alert.alert('Sucesso', 'Arquivo salvo no Downloads!');
      console.log('Arquivo salvo em:', fileUriInDownload);
    } catch (error) {
      console.error('Erro ao salvar no SAF:', error);
      Alert.alert('Erro', 'Não foi possível salvar no armazenamento.');
    }
  } else {
    await Sharing.shareAsync(fileUri);
  }
}
