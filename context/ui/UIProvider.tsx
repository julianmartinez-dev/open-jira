import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';


export interface UIState {
  sidemenuOpen: boolean;
  addingEntry: boolean;
  isDragging: boolean
}

interface Props {
    children: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  addingEntry: false,
  isDragging: false
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI_OPEN_SIDEBAR' });
  const closeSideMenu = () => dispatch({ type: 'UI_CLOSE_SIDEBAR' });
  const setAddingEntry = (isAdding: boolean) => dispatch({ type: 'UI_ADDING_ENTRY', payload: isAdding });
  const startDraggin = () => dispatch({ type : 'UI_START_DRAGGING' });
  const endDragging = () => dispatch({ type : 'UI_END_DRAGGING' });


  return (
    <UIContext.Provider
      value={{
        ...state,
        //Methods
        openSideMenu,
        closeSideMenu,
        setAddingEntry,
        startDraggin,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};