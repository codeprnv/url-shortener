import type { ChangeEventHandler } from 'react';
import { useRef } from 'react';

interface InputType {
  type: string;
  name: string;
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  autoComplete: string
}

const InputField = ({ type, name, id, label, value, onChange, autoComplete}: InputType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className='relative my-1 w-full'>
      <input
        ref={inputRef}
        id={id}
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange} // Pass the handler here
        className='h-15 peer w-full rounded-2xl px-7 py-4 text-xs font-semibold tracking-wider shadow-lg ring ring-[#1B3582] transition-colors focus:shadow-[#2e62ff] focus:outline focus:outline-[#2e62ff] lg:text-base '
        placeholder=' ' // Use a space instead of an empty string
      />
      <label
        htmlFor={id}
        onClick={handleLabelClick}
        className='absolute left-7 top-4 -translate-y-7 scale-75 transform text-xs font-semibold tracking-wider text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-x-2 peer-focus:-translate-y-7 peer-focus:text-white lg:text-base'
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
