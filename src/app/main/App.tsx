import React from 'react';
import { SafeAreaView } from 'react-native';
import AppRoutes from '../presentation/navigation/AppNavigator';
import { DataBaseHelper } from '../data/datasources/local/DataBaseHelper';


const App = () => {
  DataBaseHelper.init();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppRoutes/>
    </SafeAreaView>
  );
};

export default App;