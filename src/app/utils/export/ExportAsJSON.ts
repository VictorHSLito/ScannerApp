import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

export async function exportAsJSON(data: any, fileName = `lista_itens_${Date.now()}.json`): Promise<string | undefined> {
  try {
    console.log('Iniciando exportação JSON...');

    const jsonString = JSON.stringify(data, null, 2);
    const localUri = FileSystem.cacheDirectory + fileName;

    await FileSystem.writeAsStringAsync(localUri, jsonString, { encoding: FileSystem.EncodingType.UTF8 });
    console.log('JSON gerado em:', localUri);

    if (Platform.OS === 'android') {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert('Permissão negada', 'Não foi possível obter permissão para acessar o armazenamento.');
        return;
      }

      const fileUriInDownload = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        'application/json'
      );

      const fileContent = await FileSystem.readAsStringAsync(localUri, { encoding: FileSystem.EncodingType.UTF8 });
      await FileSystem.writeAsStringAsync(fileUriInDownload, fileContent, { encoding: FileSystem.EncodingType.UTF8 });

      Alert.alert('Sucesso', 'Arquivo JSON salvo no Downloads!');
      console.log('Arquivo JSON salvo em:', fileUriInDownload);
      return fileUriInDownload;
    } else {
      await Sharing.shareAsync(localUri);
      return localUri;
    }
  } catch (error) {
    console.error('Erro na exportação JSON:', error);
    Alert.alert('Erro', 'Não foi possível exportar o JSON.');
    return;
  }
}

