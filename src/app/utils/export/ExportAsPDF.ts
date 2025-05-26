import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ItemModel } from '../../data/model/ItemModel';

export async function exportAsPDF(items: ItemModel[]) {
    console.log('Iniciando exportação PDF...');

    let totalCompra = 0;
    let html = `
    <h1>Lista de Itens</h1>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr><th>Nome</th><th>Preço</th><th>Quantidade</th><th>Total</th></tr>
  `;

    items.forEach((item) => {
        const totalItem = item.price * item.quantity;
        totalCompra += totalItem;
        html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>${totalItem.toFixed(2)}</td>
      </tr>
    `;
    });

    html += `
    <tr>
      <td colspan="3" style="text-align: right; font-weight: bold;">Total da Compra:</td>
      <td style="font-weight: bold;">${totalCompra.toFixed(2)}</td>
    </tr>
    </table>
  `;

    const { uri } = await Print.printToFileAsync({ html });
    console.log('PDF gerado em:', uri);

    const newPath = FileSystem.cacheDirectory + 'items.pdf';
    await FileSystem.moveAsync({
        from: uri,
        to: newPath,
    });

    console.log('PDF movido para:', newPath);

    if (!(await Sharing.isAvailableAsync())) {
        throw new Error('Compartilhamento não disponível neste dispositivo.');
    }

    await Sharing.shareAsync(newPath, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar PDF',
    });

    console.log('Exportação concluída!');
}
