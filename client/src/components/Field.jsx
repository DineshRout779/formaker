import { useRef } from 'react';
import AnswerType from './AnswerType';

/* eslint-disable react/prop-types */
const fieldTypes = ['text', 'paragraph', 'number', 'email', 'date'];

const Field = ({ field, onFieldChange, index }) => {
  const labelRef = useRef();
  const typeRef = useRef();

  const handleChange = (index) => {
    const type = typeRef.current.value;
    const label = labelRef.current.value;
    onFieldChange(index, { label, type });
  };

  return (
    <div className='p-4 rounded-md bg-purple-50 shadow-md my-4 border border-l-4 border-l-purple-500 border-gray-200'>
      {/* question top */}
      <div className='flex gap-4 justify-between items-center'>
        <div className='flex gap-2 items-center grow'>
          <span className='font-semibold w-fit'>{index + 1}.</span>
          <input
            type='text'
            name='label'
            id='label'
            value={field.label}
            onChange={() => handleChange(index)}
            ref={labelRef}
            className='font-semibold p-2 grow'
          />
        </div>

        <select
          name='type'
          id='type'
          className='block p-2 rounded-md'
          onChange={() => handleChange(index)}
          ref={typeRef}
        >
          {fieldTypes.map((fieldType, i) => (
            <option key={i} value={fieldType}>
              {fieldType}
            </option>
          ))}
        </select>
      </div>
      <div className='px-6 my-2'>
        <AnswerType type={field?.type} />
      </div>{' '}
    </div>
  );
};

export default Field;
