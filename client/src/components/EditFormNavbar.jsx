/* eslint-disable react/prop-types */
import axios from 'axios';
import { Check, CircleNotch } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditFormNavbar = ({ formId, form }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const saveForm = useCallback(async () => {
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
  }, [formId, form]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveForm();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [form, formId, saveForm]);

  return (
    <div className='flex py-4 justify-between items-center container-max'>
      <h1 className='text-2xl font-semibold' title='Formaker Logo'>
        Formaker 🚀
      </h1>
      <div className='flex gap-4 items-center'>
        <button
          title='Save form'
          onClick={saveForm}
          className='flex text-sm items-center gap-2'
        >
          Saved
          {isLoading ? (
            <span className='animate-spin'>
              <CircleNotch size={16} />
            </span>
          ) : (
            <Check size={16} />
          )}
        </button>
        <button
          onClick={() => navigate(`/`)}
          className='bg-purple-600 flex gap-2 items-center text-white rounded-full hover:shadow-xl p-2 px-6'
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditFormNavbar;
