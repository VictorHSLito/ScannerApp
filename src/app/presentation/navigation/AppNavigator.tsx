import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemListScreen from '../screens/ItemListScreen';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen';
import { ItemModel } from '../../data/model/ItemModel';

export type StackParamList = {
  Home: undefined;
  Add: undefined;
  List: undefined;
  Edit: { item: ItemModel };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Add" component={AddItemScreen}/>
        <Stack.Screen name="List" component={ItemListScreen}/>
        <Stack.Screen name="Edit" component={EditItemScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}