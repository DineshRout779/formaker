import { useParams } from 'react-router-dom';
import EditFormNavbar from '../components/EditFormNavbar';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FormResponses = () => {
  const { id } = useParams();
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/form/${id}`,
          { signal }
        );

        const data = response.data.form;

        // console.log(response);

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

  console.log(form);

  if (isLoading || !form) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircleNotch size={32} className='text-purple-600 animate-spin' />
      </div>
    );
  }
  return (
    <div>
      <EditFormNavbar formId={id} form={form} autoSave={false} />
      {/* responses */}
      <section className='bg-[#f0ebf8] min-h-[90vh]'>
        {/* response controls */}

        <div className='container-max max-w-[678px] py-4'>
          <div className='p-4 bg-white rounded-md shadow-md border'>
            <h1 className='text-xl '>0 responses</h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormResponses;
