import React, { useState } from "react";
import * as faIcons from "react-icons/fa";

type Props = {
  hasError: boolean;
  onChange: (val: string) => void;
  onBlur: () => void;
  type: React.HTMLInputTypeAttribute;
  lable: string;
  value: string | null;
  errorMessage: string;
  onFocus: () => void;
  error: boolean;
  labelColor?: string;
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

  const labelModifier = labelColor ? labelColor : "currentColor";
  const [inititalType, setInitialType] = useState(type);

  const toggleTypeToText = () => {
    setInitialType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="z-0 flex flex-col gap-2">
      <div className={`flex items-center`}>
        <label
          className="text-grey-light"
          htmlFor={`form-${lable.toLowerCase().split(" ").join("-")}`}
          // style={{ color: labelModifier }}
        >
          {lable}
        </label>

        {hasError && (
          <span className="ml-auto text-xs text-red-400">{errorMessage}</span>
        )}
      </div>
      <div className="form-input relative">
        <input
          className={`w-full rounded-lg bg-bg-primary px-3 py-1.5 shadow-form-input-primary outline-0 outline-offset-2 focus:!outline-blue-700 ${
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
          onChange={(e) => onChange(e.currentTarget.value)}
          value={value || ""}
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
