import createDataContext from './createDataContext'
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef'
import AccountScreen from '../screens/AccountScreen'

ACTIONS = {
    start_workout: 'start_workout',
    start_set: 'start_set',
    fail_reps: 'fail_reps',
    add_makeup_reps: 'add_makeup_reps',
    complete_reps: 'complete_reps',
    finish_set: 'finish_set',
    finish_workout: 'finish_workout'
}

const workoutReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.start_workout:
            return action.payload
        case ACTIONS.start_set: 
            const set = state.targetSets.find((s) => { s.id === action.payload })
            return { ...state, currentSet: { ...set, startTime: Date.now() } }
        case ACTIONS.fail_reps:
            const set = { ...currentSet, result: action.payload, achieved: false, endTime: Date.now() }
            return { ...state, actualSets: [...state.actualSets, set] }
        case ACTIONS.add_makeup_reps:
            return { ...state, targetSets: [...state.targetSets, action.payload]}
        case ACTIONS.complete_reps:
            const set = { ...currentSet, result: action.payload, achieved: false, endTime: Date.now() }
            return { ...state }
        case ACTIONS.finish_workout:
            return { ...state, endTime: Date.now() }
        default:
            return state
    }
}

const startWorkout = dispatch => (workout) => {
    dispatch({ type: ACTIONS.start_workout, payload: workout })
}

const startSet = dispatch => (setId) => {
    dispatch({ type: ACTIONS.start_set, payload: setId })
}

const complete_reps = dispatch => (currentSet, repsCompleted) => {
    if (repsCompleted >= currentSet.target) {
        dispatch({ type: ACTIONS.complete_reps, payload: repsCompleted })
    } else {
        //bug here! handle n fails per set
        const makeupSet = {...currentSet, id: currentSet.id+'p2', parent: currentSet.id, target: currentSet.target-repsCompleted }
        dispatch({ type: ACTIONS.fail_reps, payload: repsCompleted})
        dispatch({ type: ACTIONS.add_makeup_reps, payload: makeupSet})
    }
}

const finish_workout = dispatch => () => {
    dispatch({ type: ACTIONS.finish_workout })
}

export const { Context, Provider } = createDataContext(
    workoutReducer,
    { startWorkout, startSet, complete_reps, finish_workout },
    { workoutRef: null, workoutName: "", targetSets: [], actualSets: [], currentSet: null, startTime: null, endTime: null }
)

const exampleData = {
    workoutRef: 'w1d2x3',
    workoutName: "Week 1 (x3), day 2",
    targetSets: [
        {id: 'w1d2x3s1', target: 10, restAfter: 60, plus: false}, 
        {id: 'w1d2x3s2', target: 12, restAfter: 60, plus: false}, 
        {id: 'w1d2x3s3', target: 10, restAfter: 60, plus: false}, 
        {id: 'w1d2x3s4', target: 10, restAfter: 60, plus: false}, 
        {id: 'w1d2x3s5', target: 12, restAfter: 0, plus: true}
    ],
    actualSets: [
        {id: 'w1d2x3s1', target: 10, restAfter: 60, plus: false, result: 10, achieved: true, startTime: 1575147959, endTime: 1575147959}, 
        {id: 'w1d2x3s2', target: 12, restAfter: 60, plus: false, result: 12, achieved: true, startTime: 1575147959, endTime: 1575147959}, 
        {id: 'w1d2x3s3', target: 10, restAfter: 60, plus: false, result: 10, achieved: true, startTime: 1575147959, endTime: 1575147959}, 
        {id: 'w1d2x3s4', target: 10, restAfter: 60, plus: false, result: 10, achieved: true, startTime: 1575147959, endTime: 1575147959}, 
        {id: 'w1d2x3s5', target: 12, restAfter: 0, plus: true, result: 6, achieved: false, startTime: 1575147959, endTime: 1575147959},
        {id: 'w1d2x3s5p2', parent: 'w1d2x3s5', target: 6, restAfter: 0, plus: true, result: 6, achieved: true, startTime: 1575147959, endTime: 1575147959},
    ],
    currentSet: { id: 'w1d2x3s1', target: 10, restAfter: 60, plus: false, startTime: 1575147959, nextSet: 'w1d2x3s2' },
    startTime: 1575147959,
    endTime: 1575147959,
}