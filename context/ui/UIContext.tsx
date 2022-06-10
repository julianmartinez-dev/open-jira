import { createContext } from 'react';
interface ContextProps {
  sidemenuOpen: boolean;
  addingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setAddingEntry: (isAdding: boolean) => void;

  startDraggin: () => void;
  endDragging: () => void;
}
export const UIContext = createContext({} as ContextProps);