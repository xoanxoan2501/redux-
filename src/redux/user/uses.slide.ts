import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchListUser = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const res = await fetch('http://localhost:8000/users')
    const data = await res.json()
    return data
  }
)
interface IUserPayload {
  email: string
  name: string
}
export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser())
    }

    return data
  }
)

export const editUser = createAsyncThunk(
  'users/updateUser',
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log('>>data update ', data)
    if (data && data.id) {
      //create succeed
      thunkAPI.dispatch(fetchListUser())
    }
    return data
  }
)
export const deleteUser = createAsyncThunk(
  'users/deleteAUser',
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': ' application/json',
      },
    })
    const data = await res.json()
    thunkAPI.dispatch(fetchListUser())
    return data
  }
)
interface IUser {
  id: number
  name: string
  email: string
}

const initialState: {
  listUsers: IUser[]
  isCreateSuccess: boolean
  isEditUserSuccess: boolean
  isDeleteUserSuccess: boolean
} = {
  listUsers: [],
  isCreateSuccess: false,
  isEditUserSuccess: false,
  isDeleteUserSuccess: false,
}

export const userSlide = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false
    },
    resetEdit(state) {
      state.isEditUserSuccess = false
    },
    resetDelete(state) {
      state.isDeleteUserSuccess = false
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      // Add user to the state array
      //
      //   console.log('>>>> checker action ', action)

      state.listUsers = action.payload
    }),
      builder.addCase(createNewUser.fulfilled, (state) => {
        state.isCreateSuccess = true
      }),
      builder.addCase(editUser.fulfilled, (state) => {
        state.isEditUserSuccess = true
      })
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isDeleteUserSuccess = true
    })
  },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetEdit, resetDelete } = userSlide.actions

export default userSlide.reducer
