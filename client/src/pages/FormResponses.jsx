import { useParams } from 'react-router-dom';
import EditFormNavbar from '../components/EditFormNavbar';
import { CircleNotch, Rows, Table } from 'phosphor-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from '../components/Switch';
import ResponseTable from '../components/ResponseTable';
import ResponseRows from '../components/ResponseRows';

const FormResponses = () => {
  const { id } = useParams();
  const [form, setForm] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showAsTable, setShowAsTable] = useState(false);

  const saveForm = async (status) => {
    // console.log('status: ', status);
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/form/${id}`, {
        ...form,
        acceptingResponses: status,
      });
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

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
          <div className='p-4 bg-white rounded-md shadow-md border '>
            <div className='block md:flex justify-between items-center'>
              <h1 className='text-xl mb-2 md:m-0'>
                {form?.responses?.length} responses
              </h1>

              <Switch
                onToggle={saveForm}
                isAcceptingResponses={form?.acceptingResponses}
              />
            </div>
          </div>

          {/* data style */}
          <div className='mt-4 flex justify-end items-center gap-1 text-gray-500'>
            <span className='mr-3'>View as</span>
            <button
              onClick={() => setShowAsTable(true)}
              className={`bg-gray-100 p-1 rounded-md ${
                showAsTable ? 'bg-blue-600 text-white' : ''
              }`}
            >
              <Table size={24} />
            </button>
            <button
              onClick={() => setShowAsTable(false)}
              className={`bg-gray-100 p-1 rounded-md ${
                !showAsTable ? 'bg-blue-600 text-white' : ''
              }`}
            >
              <Rows size={24} />
            </button>
          </div>

          {/* questions and answers */}
          {form?.responses?.length === 0 ? (
            <div className='p-4 bg-white rounded-md shadow-md border my-4 min-h-24 text-sm flex justify-center items-center'>
              <p className='text-gray-500'>Waiting for responses</p>
            </div>
          ) : (
            <section>
              {!showAsTable ? (
                <ResponseRows form={form} />
              ) : (
                <ResponseTable form={form} />
              )}
            </section>
          )}
        </div>
      </section>
    </div>
  );
};

export default FormResponses;
