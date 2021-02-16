import React from "react";

interface InitialValues  {
  [key: string]: string
}
export default function useInputs(iv: InitialValues) {
  const [inputs, setInputs] = React.useState(iv)

  const resetInputs = () => setInputs(iv)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  

  return {
    inputs,
    resetInputs,
    handleChange,
  }
}