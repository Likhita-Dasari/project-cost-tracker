import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { setUser } from '../store/authSlice';
import { Box, Heading, Input, Button, VStack, Text, useToast } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      dispatch(setUser({ uid: userCredential.user.uid, email: userCredential.user.email }));
      toast({
        title: isSignUp ? 'Sign Up Successful' : 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} maxW="400px" mx="auto" mt="10vh">
      <Heading>{isSignUp ? 'Sign Up' : 'Login'}</Heading>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleAuth}>
        {isSignUp ? 'Sign Up' : 'Login'}
      </Button>
      <Text>
        {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </Button>
      </Text>
    </VStack>
  );
};

export default Login;