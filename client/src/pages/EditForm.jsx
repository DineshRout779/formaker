import axios from 'axios';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditFormNavbar from '../components/EditFormNavbar';
import Field from '../components/Field';

const EditForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    fields: [],
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleAddField = () => {
    setForm({
      ...form,
      fields: [
        ...form.fields,
        {
          label: 'Untitled question',
          type: 'text',
        },
      ],
    });
  };

  const updateField = (index, updatedField) => {
    // console.log('here: ', index, updatedField);
    setForm({
      ...form,
      fields: form.fields.map((field, i) =>
        i === index
          ? { ...field, label: updatedField.label, type: updatedField.type }
          : field
      ),
    });
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
    <div>
      <EditFormNavbar formId={id} form={form} autoSave={true} />
      {/* form */}
      <section className='bg-[#f0ebf8]'>
        <form className='container-max max-w-[678px] py-4'>
          {/* form header */}
          <div className='p-4 shadow-md rounded-md bg-white border border-t-8 border-t-purple-500 border-gray-200'>
            <input
              type='text'
              title='Form title'
              className='outline-none border-b border-b-transparent py-2 focus-visible:border-b-slate-300 w-full bg-transparent text-xl my-2  font-semibold'
              value={form?.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
            <textarea
              title='Form description'
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              type='text'
              name='description'
              rows={1}
              id='description'
              placeholder='Form description'
              className='outline-none border-b border-b-transparent py-2 focus:border-b-slate-300 w-full resize-y bg-transparent'
            />
          </div>

          {/* form body */}
          <div>
            {form?.fields?.map((field, i) => (
              <Field
                key={i}
                index={i}
                field={field}
                onFieldChange={updateField}
              />
            ))}
            <button
              onClick={handleAddField}
              type='button'
              className='border border-purple-600 my-4 flex gap-2 items-center text-purple-600 rounded-md hover:shadow-xl p-2 px-6'
            >
              Add field
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditForm;
