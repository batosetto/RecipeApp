import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { incrementPeople, decrementPeople } from '../redux/actions/index'
import { fetchRecipesByIngredients } from '../services/api'

function RecipeList(props) {
    const { peopleCount, incrementPeople, decrementPeople } = props;

    const logoIcon = require('../assets/iconapp.png');
    const [ingredients, setIngredients] = useState('');
    const [apiRecipes, setApiRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleRecipeSelect = (recipe) =>{
        setSelectedRecipe(recipe);
    }

    const getRecipes = async () => {
        if(ingredients){
            const recipesData = await fetchRecipesByIngredients(ingredients);
            setApiRecipes(recipesData);
        }
    };

    const clearSearch = () => {
        setIngredients(''); 
        setApiRecipes([]); 
    };


    const adjustIngredientQuantity = (ingredient) => {
        // Verifying if the peopleCount is a number
        if (typeof props.peopleCount !== 'number' || isNaN(props.peopleCount)) {
            console.error("Invalid peopleCount:", props.peopleCount);
            return ingredient.original;
        }
    
        // Extract the value from the ingredient description
        const regex = /(\d+(\.\d*)?|\.\d+)/;
        const match = ingredient.original.match(regex);
        console.log("Matched Value:", match);
        
        if (match) {
            const originalQuantity = parseFloat(match[0]);
            console.log("Original Quantity:", originalQuantity);
            const adjustedQuantity = originalQuantity * props.peopleCount;
            console.log("Adjusted Quantity:", adjustedQuantity);
            return ingredient.original.replace(originalQuantity.toString(), adjustedQuantity.toFixed(2).toString());
        }
        return ingredient.original;  // Retun the original ingredient description if no quantity is found
    }
    

    return (
        <View style={styles.container}>
            <Image source={logoIcon} style={styles.logo} />
            <Text style={styles.title}>
                Welcome to you favourite recipe{"'"}s app!
            </Text>
            <TextInput
                style={styles.input} 
                placeholder='Enter ingredient'
                value={ingredients}
                onChangeText={setIngredients}
            />
            <Button
                title='Search Recipes'
                onPress={getRecipes}
            />

            <FlatList 
                data={apiRecipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item })=> (
                    <TouchableOpacity onPress={() => handleRecipeSelect(item)}>
                        <View style={styles.recipeItem}>
                            <Text>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {selectedRecipe && (
                <Modal
                    visible={true}
                    onRequestClose={()=> setSelectedRecipe(null)}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{selectedRecipe.title}</Text>
                        {selectedRecipe.image && 
                            <Image source={{ uri: selectedRecipe.image }} style={styles.recipeImage} />}
                        <Text style={styles.subtitle}>
                            Missing Ingredients For Your Recipe:
                        </Text>
                        {selectedRecipe.missedIngredients.map((ingredient, index) => (
                            <View 
                                key={index} 
                                style={styles.ingredientContainer}>
                                <Text>{ingredient.original}</Text>
                            </View>
                        ))}
                        <Text style={{ marginTop: 10 }}>
                                This recipe is usually for 1 person. If you'd like to increase, please press the buttons below: {peopleCount}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Add Guests' 
                                onPress={props.incrementPeople} />
                            <Button 
                                title='Remove Guests' 
                                onPress={props.decrementPeople} />
                        </View>
                        {selectedRecipe.missedIngredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientContainer}>
                                <Text>{adjustIngredientQuantity(ingredient)}</Text>
                            </View>
                        ))}

                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={() => setSelectedRecipe(null)}>
                            <Text style={styles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                </Modal>
            )}

            <TouchableOpacity 
                style={styles.closeButton}
                onPress={clearSearch}>
                <Text style={styles.closeButtonText}>
                    Clear Search
                </Text>
            </TouchableOpacity>
        </View>
    )  
}
const mapStateToProps = (state) => ({
    
        peopleCount: state.recipes.peopleCount
})

export default connect(mapStateToProps, {incrementPeople, decrementPeople})(RecipeList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'azure',
    },
    title: {
        color: 'royalblue',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        padding: 10,
    },
    subtitle: {
        color: 'royalblue',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'royalblue',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold'

    },
    recipeItem: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    recipeImage: {
        width: 200,
        height: 200,
        marginLeft: 10
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
        marginTop: 5,
    },
    logo: {
        width: 100, 
        height: 100, 
        marginBottom: 10,
        marginTop: 15 
    },
});