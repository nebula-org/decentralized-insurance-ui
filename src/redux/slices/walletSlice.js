import { createSlice, configureStore } from '@reduxjs/toolkit'

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        value: ""
    },
    reducers: {
        connected: (state, value) => {

            state.value = value
        },
        disconnected: state => {
            state.value = ""
        }
    }
})

export const { connected, disconnected } = walletSlice.actions

export const store = configureStore({
    reducer: walletSlice.reducer
})

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(connected())
// // {value: 1}
// store.dispatch(incremented())
// // {value: 2}
// store.dispatch(decremented())
// // {value: 1}