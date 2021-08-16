import { createContext, useContext } from "react"

export type GenderContent = {
    gender : string,
    setGender : (g : string) => void
}

export const GenderContext = createContext<GenderContent>({ 
  gender: "all",
  setGender: () => {}
});

export const useGenderContext = () => useContext(GenderContext)
