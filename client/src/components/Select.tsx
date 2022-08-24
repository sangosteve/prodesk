import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "styled-components";
import { FiXCircle, FiChevronUp, FiChevronDown } from "react-icons/fi";
type SelectProps = {
  title?: string;
  name: string;
  label: string;
  id: string;
  placeholder?: string;
  options: {
    [key: string]: string;
  }[];
  onSelectChange: (selection: any) => void;
};
const StyledSelect = styled.div<SelectProps>`
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  width: 250px;
  max-height: 32px;

  > input.input-field {
    width: 100%;
    border: 1px solid #a0a8b6;
    border-radius: 3px;
    font-size: var(--text-sm);
    padding: 8px;
  }

  > label {
    margin: 4px 0px 4px 0px;
    color: #495057;
  }
  > div.icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > ul.select-options {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #fff;
    display: none;
    position: absolute;
    top: 4;
    z-index: 3000;
    /* max-height: 100px; */
    overflow-y: auto;
    &.show {
      display: block;
    }
    > li {
      padding: 5px 8px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      &:hover {
        cursor: pointer;
        background-color: whitesmoke;
      }
    }
  }
`;

const Select = ({
  id,
  name,
  title,
  label,
  placeholder,
  options,
  onSelectChange,
}: SelectProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [tempval, setTempVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState(false);
  const searchFilter = (options: { [key: string]: string }[]) => {
    return options.filter(
      (option) =>
        option[label].toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
  };
  const displayValue = () => {
    if (searchQuery.length > 0) return searchQuery;
    // if (value) return value;
    return "";
  };
  function close(e: any) {
    setOpen(e && e.target === inputRef.current);
    setSearchQuery("");
  }
  function handleInputClick() {
    setOpen(!open);
    if (val) setVal("");
  }
  const handleChange = (e: any) => {
    e.preventDefault();
    setVal(e.target.value);
    // console.log(e.target.value);
  };
  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <StyledSelect
      id={id}
      onSelectChange={onSelectChange}
      name={name}
      title={title}
      label={label}
      options={options}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {title && <label>{title}</label>}

      <input
        className="input-field"
        ref={inputRef}
        name={name}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={tempval ? tempval : placeholder}
        value={open ? displayValue() : tempval}
        onClick={handleInputClick}
        autoComplete="off"
        autoSave="false"
      />
      <div className="icon">
        {/* {val ? (
          hovered ? (
            <FiXCircle
              size={14}
              onClick={() => {
                setVal("");
                setTempVal("");
                setSearchQuery("");
              }}
            />
          ) : (
            <FiChevronUp size={14} />
          )
        ) : (
          <FiChevronDown onClick={handleChange} size={14} />
        )} */}
      </div>
      <ul className={open ? "select-options show" : "select-options"}>
        {searchFilter(options).map((option, index) => (
          <li
            key={index}
            onClick={() => {
              onSelectChange(option);
              setVal(option[label]);
              setTempVal(option[label]);
              setOpen(false);
              setSearchQuery("");
            }}
          >
            {option[label]}
          </li>
        ))}
      </ul>
    </StyledSelect>
  );
};

export default Select;
