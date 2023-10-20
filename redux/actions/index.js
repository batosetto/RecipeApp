import { INCREMENT_PEOPLE, 
        DECREMENT_PEOPLE, 
        
    } from "../actionType/index";

export const incrementPeople = () => ({
    type: INCREMENT_PEOPLE
})

export const decrementPeople = () => ({
    type: DECREMENT_PEOPLE
})