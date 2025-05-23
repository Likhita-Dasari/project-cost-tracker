import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  addOtherCost,
  updateOtherCost,
  deleteOtherCost,
} from '../store/otherCostsSlice'
import AddEditModal from './AddEditModal'
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Flex,
} from '@chakra-ui/react'

const OtherCostList = ({userId}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const otherCosts = useSelector(state => state.otherCosts.otherCosts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCost, setCurrentCost] = useState(null)

  const handleAdd = () => {
    setCurrentCost(null)
    setIsModalOpen(true)
  }

  const handleEdit = cost => {
    setCurrentCost(cost)
    setIsModalOpen(true)
  }

  const handleDelete = async id => {
    try {
      await dispatch(deleteOtherCost({userId, id})).unwrap()
      toast({
        title: 'Cost Deleted',
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

  const handleSave = async data => {
    if (!data.description || data.amount <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Description and positive amount are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    try {
      if (currentCost) {
        await dispatch(
          updateOtherCost({
            userId,
            id: currentCost.id,
            description: data.description,
            amount: Number(data.amount),
          }),
        ).unwrap()
        toast({
          title: 'Cost Updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        await dispatch(
          addOtherCost({
            userId,
            description: data.description,
            amount: Number(data.amount),
          }),
        ).unwrap()
        toast({
          title: 'Cost Added',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      setIsModalOpen(false)
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
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Other Costs</Heading>
        <Button colorScheme="blue" onClick={handleAdd}>
          Add Cost
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount (Rs)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {otherCosts.map(cost => (
            <Tr key={cost.id}>
              <Td>{cost.description}</Td>
              <Td>{cost.amount.toFixed(2)}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => handleEdit(cost)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(cost.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={currentCost}
        type="otherCost"
      />
    </Box>
  )
}

export default OtherCostList
