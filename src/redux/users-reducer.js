import {usersAPI} from '../yalantis-service';

const SET_USERS = "SET_USERS";
const SET_ACTIVE = "SET_ACTIVE";

let initialState = {
    users: [{
        lastName: ' ',
        isActive: false,
        dob: ' ',
    }],
}

const usersReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case SET_USERS:
            stateCopy.users = action.payload;
            return stateCopy;
        case SET_ACTIVE:
            stateCopy.users.find(user => user.id === action.payload.id)['isActive'] = action.payload.value;
            return stateCopy;
        default:
            return state;
    }
}

export const setUsersAC = (users) => ({type: SET_USERS, payload: users});
export const setActiveAC = (value, id) => ({
    type: SET_ACTIVE, payload: {value, id}
})

export const getUsers = () => (dispatch) => {
    usersAPI.users()
        .then(response => {
            let data = response.data;
            data.map(p => {
                if(localStorage.getItem(p['id']) === null) {
                    return (p['isActive'] = false)
                } else {
                    return (p['isActive'] = JSON.parse(localStorage.getItem(p['id'])))
                }
            })
            dispatch(setUsersAC(data));
        })
        .catch((err) => {
            console.log(err)
        })
}
export const isActive = (value, id) => (dispatch) => {
    localStorage.setItem(id, JSON.stringify(value));
    dispatch(setActiveAC(value, id));
}
export default usersReducer;