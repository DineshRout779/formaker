/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Switch = ({ isAcceptingResponses, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  useEffect(() => {
    isAcceptingResponses && setIsChecked(isAcceptingResponses);
  }, [isAcceptingResponses]);

  return (
    <>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
        <span className='label flex items-center text-sm font-medium text-gray-500'>
          Accepting responses
        </span>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider ml-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-blue-600' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
      </label>
    </>
  );
};
export default Switch;
