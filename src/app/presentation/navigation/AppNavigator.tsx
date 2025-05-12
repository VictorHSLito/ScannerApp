import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemListScreen from '../screens/ItemListScreen';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Add" component={AddItemScreen}/>
        <Stack.Screen name="List" component={ItemListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}