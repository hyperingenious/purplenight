import { useDisclosure } from "@mantine/hooks";
import { createContext, useContext } from "react";
const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return <ModelContext.Provider value={{ opened, open, close }}>{children}</ModelContext.Provider>;
};
export const useModelContext = () => useContext(ModelContext);
