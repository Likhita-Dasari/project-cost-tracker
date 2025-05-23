import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './store/authSlice';
import { fetchItems } from './store/itemsSlice';
import { fetchOtherCosts } from './store/otherCostsSlice';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Box, Spinner, Center } from '@chakra-ui/react';

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
        dispatch(fetchItems(user.uid));
        dispatch(fetchOtherCosts(user.uid));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      {user ? <Dashboard /> : <Login />}
    </Box>
  );
};

export default App;