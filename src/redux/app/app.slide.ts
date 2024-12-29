import { createSlice } from '@reduxjs/toolkit'

// First, create the thunk

const initialState: {
  mode: string
} = {
  mode: 'light',
}

export const appSlide = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeMode(state, action) {
      state.mode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeMode } = appSlide.actions

export default appSlide.reducer
