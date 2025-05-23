import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchItems = createAsyncThunk('items/fetchItems', async (userId) => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'items'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addItem = createAsyncThunk('items/addItem', async ({ userId, name, cost }) => {
  const docRef = await addDoc(collection(db, 'users', userId, 'items'), { name, cost });
  return { id: docRef.id, name, cost };
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ userId, id, name, cost }) => {
  const itemRef = doc(db, 'users', userId, 'items', id);
  await updateDoc(itemRef, { name, cost });
  return { id, name, cost };
});

export const deleteItem = createAsyncThunk('items/deleteItem', async ({ userId, id }) => {
  await deleteDoc(doc(db, 'users', userId, 'items', id));
  return id;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;