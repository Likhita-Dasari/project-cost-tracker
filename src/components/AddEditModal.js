import React, {useState, useEffect} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

const AddEditModal = ({isOpen, onClose, onSave, initialData, type}) => {
  const isItem = type === 'item'
  const [formData, setFormData] = useState({
    name: '',
    cost: 0,
    description: '',
    amount: 0,
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        cost: initialData.cost || 0,
        description: initialData.description || '',
        amount: initialData.amount || 0,
      })
    } else if (isOpen) {
      // Reset form only when modal is opened without initialData
      setFormData({
        name: '',
        cost: 0,
        description: '',
        amount: 0,
      })
    }

    /*  else {
      setFormData({name: '', cost: 0, description: '', amount: 0})
    } */
  }, [initialData])

  const handleChange = e => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleNumberChange = (value, name) => {
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSave = () => {
    const data = isItem
      ? {name: formData.name, cost: formData.cost}
      : {description: formData.description, amount: formData.amount}
    onSave(data)
    if (formData.name) {
      setFormData({
        name: '',
        cost: 0,
      })
    } else {
      setFormData({
        description: '',
        amount: 0,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData
            ? `Edit ${isItem ? 'Item' : 'Cost'}`
            : `Add ${isItem ? 'Item' : 'Cost'}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>{isItem ? 'Item Name' : 'Description'}</FormLabel>
            <Input
              name={isItem ? 'name' : 'description'}
              value={isItem ? formData.name : formData.description}
              onChange={handleChange}
              placeholder={isItem ? 'Enter item name' : 'Enter description'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{isItem ? 'Cost' : 'Amount'} (Rupees)</FormLabel>
            <NumberInput
              min={0}
              value={isItem ? formData.cost : formData.amount}
            >
              <NumberInputField
                name={isItem ? 'cost' : 'amount'}
                onChange={e =>
                  handleNumberChange(e.target.value, isItem ? 'cost' : 'amount')
                }
              />
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEditModal
