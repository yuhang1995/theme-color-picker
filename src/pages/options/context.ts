import { useContext, createContext } from "react"

interface PanelContextValue {
    panel?: string
    setPanel?: React.Dispatch<React.SetStateAction<string>>
}

export const Panelprovider = createContext<PanelContextValue>({})

export const usePanelContext = () => useContext(Panelprovider)
