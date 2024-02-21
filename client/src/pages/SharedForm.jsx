import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InputType from '../components/InputType';
import toast from 'react-hot-toast';
import { getForm, submitForm } from '../services/form';

const SharedForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAcceptingResponse, setIsAcceptingResponse] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      const formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      // console.log('Form data submitted:', formValues);

      const res = await submitForm(id, formValues);

      if (res.status === 201) {
        toast.success('Submitted successfully');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchFormData = async () => {
      try {
        const response = await getForm(id, signal);
        const data = response.data.form;
        setForm((form) => ({
          ...form,
          ...data,
        }));
        setIsAcceptingResponse(data.acceptingResponses);
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

  // console.log(isAcceptingResponse);

  if (isLoading || !form) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircleNotch size={32} className='text-purple-600 animate-spin' />
      </div>
    );
  }

  if (!isAcceptingResponse) {
    return (
      <div className='bg-[#f0ebf8] min-h-screen py-4'>
        <div className='container-max max-w-[768px] '>
          <div className='p-4 shadow-md rounded-md bg-white border border-t-8 border-t-purple-500 border-gray-200'>
            <h2 className='text-2xl mb-2'>{form?.title}</h2>
            <p className='text-gray-500 text-sm'>
              The form {form?.title} is no longer accepting responses. <br />
              Try contacting the owner of the form if you think this is a
              mistake.{' '}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className='bg-[#f0ebf8] min-h-screen py-4'>
        <div className='container-max max-w-[768px] '>
          <div className='p-4 shadow-md rounded-md bg-white border border-t-8 border-t-purple-500 border-gray-200'>
            <h2 className='text-2xl mb-2'>{form?.title}</h2>
            <p className='text-gray-500'>
              Your reponses has been received, Thank you.
            </p>
          </div>
        </div>
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
        <form onSubmit={handleSubmit}>
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
          <div className='flex justify-between items-center'>
            <button
              className='bg-purple-600 text-white p-2 px-4 rounded-md'
              type='submit'
            >
              Submit
            </button>
            <button
              className='bg-gray-200 text-gray-900 p-2 px-4 rounded-md'
              type='reset'
            >
              Clear form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SharedForm;
