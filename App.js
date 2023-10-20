import {StyleSheet, 
        SafeAreaView 
} from 'react-native';
import { Provider } from 'react-redux'
import RecipeList from './RecipeList/RecipeList'
import store from './redux/store/index'


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <RecipeList />
      </Provider>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
