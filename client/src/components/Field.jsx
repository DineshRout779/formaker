import { useRef } from 'react';
import AnswerType from './AnswerType';
import { Trash } from 'phosphor-react';

/* eslint-disable react/prop-types */
const fieldTypes = ['text', 'paragraph', 'number', 'email', 'date'];

const Field = ({ field, onFieldChange, index, onRemove }) => {
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
      <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
        <div className='flex gap-2 items-center grow'>
          <span className='font-semibold w-fit'>{index + 1}.</span>
          <input
            type='text'
            name='label'
            title='Field label'
            id='label'
            value={field.label}
            onChange={() => handleChange(index)}
            ref={labelRef}
            className='font-semibold border rounded-md p-2 grow'
          />
        </div>

        <div className='flex items-center gap-2'>
          <select
            name='type'
            id='type'
            title='Field input type'
            className='block grow p-2 ml-5 border md:ml-0 rounded-md'
            onChange={() => handleChange(index)}
            ref={typeRef}
          >
            {fieldTypes.map((fieldType, i) => (
              <option key={i} value={fieldType}>
                {fieldType}
              </option>
            ))}
          </select>

          <button
            type='button'
            title='Remove field'
            onClick={() => onRemove(index)}
            className='p-2 bg-white hover:bg-red-400 hover:text-white border rounded-md'
          >
            <Trash size={24} />
          </button>
        </div>
      </div>
      <div className='px-6 my-4'>
        <AnswerType type={field?.type} />
      </div>
    </div>
  );
};

export default Field;
