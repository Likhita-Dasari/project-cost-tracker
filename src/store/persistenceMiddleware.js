const persistenceMiddleware = store => next => action => {
  // First, pass the action to the next middleware/reducer
  const result = next(action)

  // After the state is updated, save the relevant slices to localStorage
  const state = store.getState()
  const stateToPersist = {
    items: state.items,
    otherCosts: state.otherCosts,
  }

  try {
    localStorage.setItem(
      'projectCostTrackerState',
      JSON.stringify(stateToPersist),
    )
  } catch (error) {
    console.error('Error saving state to localStorage:', error)
  }

  return result
}

export default persistenceMiddleware
