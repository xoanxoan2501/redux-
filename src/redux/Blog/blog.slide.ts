import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListBlogs = createAsyncThunk(
  'blogs/fetchByIdStatus',
  async () => {
    const res = await fetch('http://localhost:8000/blogs')
    const data = await res.json()
    return data
  }
)
interface IBlog {
  id: number
  title: string
  author: string
  content: string
}
const initialState: {
  listBlogs: IBlog[]
  isCreateBlogSuccess: boolean
  isEditBlogSuccess: boolean
  isDeleteBlogSuccess: boolean
} = {
  listBlogs: [],
  isCreateBlogSuccess: false,
  isEditBlogSuccess: false,
  isDeleteBlogSuccess: false,
}

export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlog',
  async (payload: any, thunkAPI) => {
    const res = await fetch('http://localhost:8000/blogs', {
      method: 'POST',
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (data && data.id) {
      console.log(data)
      thunkAPI.dispatch(fetchListBlogs())
    }

    return data
  }
)

export const editBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log('>>data update ', data)
    if (data && data.id) {
      //create succeed
      thunkAPI.dispatch(fetchListBlogs())
    }
    return data
  }
)
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': ' application/json',
      },
    })
    const data = await res.json()
    thunkAPI.dispatch(fetchListBlogs())
    return data
  }
)

export const blogSlide = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetBlogCreate(state) {
      state.isCreateBlogSuccess = false
    },
    resetBlogEdit(state) {
      state.isEditBlogSuccess = false
    },
    resetBlogDelete(state) {
      state.isDeleteBlogSuccess = false
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
      // Add user to the state array
      //
      //   console.log('>>>> checker action ', action)

      state.listBlogs = action.payload
    })
    builder.addCase(createNewBlog.fulfilled, (state) => {
      state.isCreateBlogSuccess = true
    })
    builder.addCase(editBlog.fulfilled, (state) => {
      state.isEditBlogSuccess = true
    })
    builder.addCase(deleteBlog.fulfilled, (state) => {
      state.isDeleteBlogSuccess = true
    })
  },
})
export const { resetBlogCreate, resetBlogEdit, resetBlogDelete } =
  blogSlide.actions

export default blogSlide.reducer
