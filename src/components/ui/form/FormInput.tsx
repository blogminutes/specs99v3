import React, { useState } from "react";
import * as faIcons from "react-icons/fa";

type Props = {
  hasError: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  type: React.HTMLInputTypeAttribute;
  lable: string;
  value: string;
  errorMessage: string;
  onFocus: () => void;
  labelColor: string;
  error: boolean;
};

const FormInput: React.FC<Props> = (props) => {
  const {
    hasError,
    onChange,
    onBlur,
    type,
    lable,
    value,
    errorMessage,
    onFocus,
    labelColor,
    error,
  } = props;

  const labelModifier = labelColor ? labelColor : "white";
  const [inititalType, setInitialType] = useState(type);

  const toggleTypeToText = () => {
    setInitialType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center`}>
        <label
          className="text-grey-light"
          htmlFor={`form-${lable.toLowerCase().split(" ").join("-")}`}
          style={{ color: labelModifier }}
        >
          {lable}
        </label>

        {hasError && (
          <span className="ml-auto text-xs text-red-400">{errorMessage}</span>
        )}
      </div>
      <div className="form-input relative">
        <input
          className={`w-full min-w-[18rem] rounded-lg bg-primary px-3 py-1.5 shadow-form-input-primary outline-0 ${
            hasError
              ? "outline !outline-1 outline-red-500"
              : !error
              ? "outline !outline-1 outline-secondary"
              : ""
          }`}
          onFocus={onFocus}
          type={inititalType}
          id={`form-${lable?.toLowerCase().split(" ").join("-")}`}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          hidden={false}
        />
        {type === "password" && (
          <faIcons.FaRegEye
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer ${
              inititalType === "password" ? "" : "form-input-svg--open"
            }`}
            onClick={toggleTypeToText}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;
