const loadState = () => {
  try {
    const serializedState = localStorage.getItem('projectCostTrackerState')
    if (serializedState === null) {
      return undefined // If no state exists, let Redux use the default initial state
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error('Error loading state from localStorage:', error)
    return undefined // On error, fall back to default state
  }
}

export default loadState
