import axios from 'axios';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InputType from '../components/InputType';

const SharedForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchFormData = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/form/${id}`,
          { signal }
        );

        const data = response.data.form;

        setForm((form) => ({
          ...form,
          ...data,
        }));
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();

    return () => {
      abortController.abort();
    };
  }, [id]);

  // console.log(form);

  if (isLoading || !form) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircleNotch size={32} className='text-purple-600 animate-spin' />
      </div>
    );
  }

  return (
    <div className='bg-[#f0ebf8] min-h-screen py-4'>
      <div className='container-max max-w-[768px] '>
        {/* form header */}
        <div className='p-4 shadow-md rounded-md bg-white border border-t-8 border-t-purple-500 border-gray-200'>
          <h1 className='text-2xl mb-2'>{form?.title}</h1>
          <p className='text-gray-500'>{form?.description}</p>
        </div>

        {/* form questions */}
        <form>
          {form?.fields?.map((field) => (
            <div
              key={field._id}
              className='p-4 rounded-md bg-white shadow-md my-4 border '
            >
              <label htmlFor={field.label} className='block font-semibold'>
                {field.label}
              </label>
              <InputType
                type={field.type}
                name={field.label}
                id={field.label}
                placeholder={`Enter ` + field.label}
              />
            </div>
          ))}
          <button
            className='bg-purple-600 text-white p-2 px-4 rounded-md'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharedForm;
