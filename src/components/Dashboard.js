import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase'
import {clearUser} from '../store/authSlice'
import ItemList from './ItemList'
import OtherCostList from './OtherCostList'
import {Box, Heading, Button, Flex, Text, useToast} from '@chakra-ui/react'

const Dashboard = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const {user} = useSelector(state => state.auth)
  const items = useSelector(state => state.items.items)
  const otherCosts = useSelector(state => state.otherCosts.otherCosts)

  const totalCost =
    items.reduce((sum, item) => sum + item.cost, 0) +
    otherCosts.reduce((sum, cost) => sum + cost.amount, 0)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
      toast({
        title: 'Logged Out',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading>Project Cost Tracker</Heading>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
      <Text fontSize="2xl" mb={4}>
        Total Cost: Rs {totalCost.toFixed(2)}
      </Text>
      <Flex direction={{base: 'column', md: 'row'}} gap={8}>
        <Box flex="1">
          <ItemList userId={user.uid} />
        </Box>
        <Box flex="1">
          <OtherCostList userId={user.uid} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Dashboard
