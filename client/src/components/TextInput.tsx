import React from "react";
import styled from "styled-components";

type InputProps = {
  type: "text" | "email" | "password" | "number";
  name: string;
  placeholder?: string;
  label?: string;
  caption?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  variant?: "error" | "success";
  value?: any;
};

interface Colors {
  [key: string]: string | undefined;
}
const Color: Colors = {
  primary: `var(--light-primary-10)`,
  success: `var(--light-green-10)`,
  warning: `var(--light-orange-10)`,
  danger: `var(--light-red-10)`,
  dark: `var(--light-neutral-10)`,
};
const StyledInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  justify-content: "space-between";
  font-size: ${({ size }) => {
    if (size) {
      if (size === "sm") return `var(--text-xs)`;
      if (size === "md") return `var(--text-sm)`;
      if (size === "lg") return `var(--text-base)`;
    }
    return `var(--text-sm)`;
  }};

  /* LABEL STYLES */
  > label {
    margin: 4px 0px 4px 0px;
    font-weight: 600;
    color: ${({ variant }) => {
      if (variant) {
        if (variant === "error") return "#D12C2C";
        if (variant === "success") return "#00AB55";
      }
      return `#000`;
    }};
  }
  /* INPUT STYLES */
  > input {
    font-size: ${({ size }) => {
      if (size) {
        if (size === "sm") return `var(--text-sm)`;
        if (size === "md") return `var(--text-base)`;
        if (size === "lg") return `var(--text-md)`;
      }
      return `var(--text-sm)`;
    }};

    padding: ${({ size }) => {
      if (size) {
        if (size === "sm") return `0.25rem 0.38rem`;
        if (size === "md") return `8px`;
        if (size === "lg") return `0.5rem 0.5rem`;
      }
      return `0.38rem 0.5rem`;
    }};
    border: ${({ variant }) => {
      if (variant) {
        if (variant === "error") return `1px solid #D12C2C`;
        if (variant === "success") return `1px solid #00AB55`;
      }
      return `1px solid #A0A8B6`;
    }};
    border-radius: 3px;
    &:focus {
      outline: none;
      border: ${({ variant }) => {
        if (variant) {
          if (variant === "error") return `1px solid #D12C2C`;
          if (variant === "success") return `1px solid #00AB55`;
        }
        return `1px solid #495057`;
      }};
      //box-shadow: 0px 0px 2px #556ee6;
      box-shadow: ${({ variant }) => {
        if (variant) {
          if (variant === "error") return `0px 0px 2px #D12C2C`;
          if (variant === "success") return `0px 0px 2px #00AB55`;
        }
        return `1px solid #A0A8B6`;
      }};
    }

    background-color: ${({ disabled }) => {
      if (disabled) return `#f4f5f6`;
    }};
  }
`;

const TextInput = ({
  type,
  placeholder,
  label,
  caption,
  disabled,
  handleChange,
  size,
  variant,
  name,
  value,
}: InputProps) => {
  return (
    <StyledInput
      name={name}
      type={type}
      placeholder={placeholder}
      label={label}
      caption={caption}
      disabled={disabled}
      size={size}
      variant={variant}
    >
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        value={value}
      />
      {caption && <small>{caption}</small>}
    </StyledInput>
  );
};

export default TextInput;
