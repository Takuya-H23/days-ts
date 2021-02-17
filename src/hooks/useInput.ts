import React from "react";

interface InitialValues  {
  [key: string]: string
}
export default function useInputs(iv: InitialValues) {
  const [input, setInput] = React.useState(iv)

  const resetInput = () => setInput(iv)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  
  return {
    input,
    resetInput,
    handleChange,
  }
}