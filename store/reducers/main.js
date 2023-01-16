import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PREW_DAY, TODAY } from '../../utils/date'
import {
  getCollection,
  updateDocument,
  setDocument,
  deleteDocument
} from '../../firebase/firestore'

export const fetchHabits = createAsyncThunk(
  'main/fetchHabits',
  async (params, thunkAPI) => {
    const collection = await getCollection(params)
    return collection
  }
)
export const editHabit = createAsyncThunk(
  'main/editHabit',
  async ({ path, data }, thunkAPI) => {
    const res = await updateDocument(path, data)
    console.log('res:', res)
    if (res.success) {
      return {
        id: path[path.length - 1],
        data
      }
    }
  }
)
export const addHabit = createAsyncThunk(
  'main/addHabit',
  async ({ path, data }, thunkAPI) => {
    const res = await setDocument(path, data)
    if (res.success) {
      return {
        id: res.id,
        data
      }
    }
  }
)
export const deleteHabit = createAsyncThunk(
  'main/deleteHabit',
  async ({ path, id }, thunkAPI) => {
    const res = await deleteDocument(path, id)
    if (res.success) {
      return {
        id: res.id
      }
    }
  }
)

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    user: null,
    settings: null,
    habits: [],
    load: false,

    today: TODAY,
    activeDay: TODAY
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    [fetchHabits.pending]: (state, action) => {
      state.load = true
    },
    [fetchHabits.fulfilled]: (state, action) => {
      state.load = false
      state.habits = action.payload
    },
    [fetchHabits.rejected]: (state, action) => {
      state.load = false
    },

    [editHabit.pending]: (state, action) => {
      state.load = true
    },
    [editHabit.fulfilled]: (state, action) => {
      state.load = false
      const { id, data } = action.payload
      const index = state.habits.findIndex(([_id]) => _id === id)
      state.habits[index] = [id, data]
    },
    [editHabit.rejected]: (state, action) => {
      state.load = false
    },

    [addHabit.fulfilled]: (state, action) => {
      const { id, data } = action.payload
      state.habits.push([id, data])
    },

    [deleteHabit.fulfilled]: (state, action) => {
      const { id } = action.payload
      state.habits = state.habits.filter(([_id]) => _id !== id)
    }
  }
})

export const selectState = (state) => state
export const selectLoad = (state) => state.load
export const selectUser = (state) => state.user
export const selectHabits = (state) => state.habits
export const selectSettings = (state) => state.settings

export const { setUser } = mainSlice.actions

export default mainSlice.reducer
