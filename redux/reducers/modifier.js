import { INCREMENT_PEOPLE, 
    DECREMENT_PEOPLE, 
    
} from "../actionType/index";

const initialState = {
    peopleCount: 1
}

export default function (state = initialState, action){
    switch(action.type){
        case INCREMENT_PEOPLE:
            return {
                ...state,
                peopleCount: state.peopleCount + 1
            }
        case DECREMENT_PEOPLE:
            return {
                ...state,
                peopleCount: state.peopleCount - 1
            }
        default:
            return state
    }
}
