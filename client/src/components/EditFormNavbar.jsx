/* eslint-disable react/prop-types */
import axios from 'axios';
import { Check, CircleNotch } from 'phosphor-react';
import { useState } from 'react';

const EditFormNavbar = ({ formId, form }) => {
  const [isLoading, setIsLoading] = useState(false);
  const saveForm = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/v1/form/${formId}`,
        form
      );

      console.log(res);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex py-4 justify-between items-center container-max'>
      <h1 className='text-2xl font-semibold' title='Formaker Logo'>
        Formaker 🚀
      </h1>
      <button
        title='Create a new form'
        onClick={saveForm}
        className='bg-purple-600 flex gap-2 items-center text-white rounded-full hover:shadow-xl p-2 px-6'
      >
        Save{' '}
        {isLoading ? (
          <span className='animate-spin'>
            <CircleNotch size={16} />
          </span>
        ) : (
          <Check size={16} />
        )}
      </button>
    </div>
  );
};

export default EditFormNavbar;
