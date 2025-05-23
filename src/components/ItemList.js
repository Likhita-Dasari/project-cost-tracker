import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addItem, updateItem, deleteItem} from '../store/itemsSlice'
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

const ItemList = ({userId}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const items = useSelector(state => state.items.items)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const handleAdd = () => {
    setCurrentItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = item => {
    setCurrentItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = async id => {
    try {
      await dispatch(deleteItem({userId, id})).unwrap()
      toast({
        title: 'Item Deleted',
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
    if (!data.name || data.cost <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Name and positive cost are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    try {
      if (currentItem) {
        await dispatch(
          updateItem({
            userId,
            id: currentItem.id,
            name: data.name,
            cost: Number(data.cost),
          }),
        ).unwrap()
        toast({
          title: 'Item Updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        await dispatch(
          addItem({userId, name: data.name, cost: Number(data.cost)}),
        ).unwrap()
        toast({
          title: 'Item Added',
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
        <Heading size="md">Items</Heading>
        <Button colorScheme="blue" onClick={handleAdd}>
          Add Item
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Cost (Rs)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(item => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.cost.toFixed(2)}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(item.id)}
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
        initialData={currentItem}
        type="item"
      />
    </Box>
  )
}

export default ItemList
