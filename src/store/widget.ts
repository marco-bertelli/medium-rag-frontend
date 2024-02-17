import { createSlice } from '@reduxjs/toolkit'
import { RootState, WidgetState } from 'types/state'

const initialState: WidgetState = {
  toggleWidget: false,
  showHelpMessage: false,
  userId: null,
}

export const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setToggleWidget: (state, action) => {
      state.toggleWidget = action.payload
      window.parent.postMessage({ type: 'toggleWidget', payload: action.payload }, '*')
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
  },
})

export const { setToggleWidget, setUserId } = widgetSlice.actions
export const selectToggleWidget = (rootState: RootState) => rootState.widgetState.toggleWidget
export default widgetSlice.reducer
