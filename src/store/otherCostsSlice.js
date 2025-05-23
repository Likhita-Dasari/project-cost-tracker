import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchOtherCosts = createAsyncThunk('otherCosts/fetchOtherCosts', async (userId) => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'otherCosts'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addOtherCost = createAsyncThunk('otherCosts/addOtherCost', async ({ userId, description, amount }) => {
  const docRef = await addDoc(collection(db, 'users', userId, 'otherCosts'), { description, amount });
  return { id: docRef.id, description, amount };
});

export const updateOtherCost = createAsyncThunk('otherCosts/updateOtherCost', async ({ userId, id, description, amount }) => {
  const costRef = doc(db, 'users', userId, 'otherCosts', id);
  await updateDoc(costRef, { description, amount });
  return { id, description, amount };
});

export const deleteOtherCost = createAsyncThunk('otherCosts/deleteOtherCost', async ({ userId, id }) => {
  await deleteDoc(doc(db, 'users', userId, 'otherCosts', id));
  return id;
});

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: {
    otherCosts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.otherCosts = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.otherCosts.push(action.payload);
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        const index = state.otherCosts.findIndex(cost => cost.id === action.payload.id);
        state.otherCosts[index] = action.payload;
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
      });
  },
});

export default otherCostsSlice.reducer;