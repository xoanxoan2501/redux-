import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState = {
  value: 10,
  name: 'Xoan Emm',
  address: {
    name: 'Xoan Emm',
    code: 5000,
  },
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 10
    },
    decrease: (state) => {
      state.value -= 10
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrease } = counterSlice.actions

export default counterSlice.reducer
