// import { combineReducers } from "redux"

const state123 = {
    num: 1,
    num2: 2,
    list: [
        '1234',
        'qwer',
        'zxcv',
        '6789'
    ]
}

function getName(state = state123, action) {
    switch (action.type) {
        case 'ADD':
            return { num: state.num + 1 }
        case 'SUB':
            return { num: state.num - 1 }
        default:
            return state
    }
}


export default getName