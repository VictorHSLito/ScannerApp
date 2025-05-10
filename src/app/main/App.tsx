import React from 'react';
import { SafeAreaView } from 'react-native';
import ItemListScreen from '../presentation/screens/ItemListScreen';


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ItemListScreen />
    </SafeAreaView>
  );
};

export default App;