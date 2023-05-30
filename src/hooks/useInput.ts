import { useState } from "react";

const useInput = (
  validationFunction: (val: string) => boolean,
  initialValue: string
) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  let valueIsValid = validationFunction(value);
  const error = !valueIsValid;
  const [showError, setShowError] = useState(false);
  const hasError = showError && error;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onBlur = () => {
    setIsTouched(true);
    setShowError(true);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const showErrorHandler = () => {
    setShowError(true);
  };

  const resetInput = () => {
    setValue("");
    setShowError(false);
  };

  return {
    value,
    isTouched,
    onBlur,
    onFocus,
    onChange,
    resetInput,
    hasError,
    error,
    isFocused,
    showError,
    showErrorHandler,
  };
};

export default useInput;
