import { CircleNotch, Plus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditFormNavbar from '../components/EditFormNavbar';
import Field from '../components/Field';
import { getForm } from '../services/form';

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
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 0);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...form.fields];

    updatedFields.splice(index, 1);

    setForm({
      ...form,
      fields: updatedFields,
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
        const response = await getForm(id, signal);

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
      <section className='bg-[#f0ebf8] min-h-[85vh]'>
        <form className='container-max max-w-[678px] py-4'>
          {/* form header */}
          <div className='p-4 shadow-md rounded-md bg-white border border-t-8 border-t-purple-500 border-gray-200'>
            <input
              type='text'
              autoFocus
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
                onRemove={handleRemoveField}
              />
            ))}
            <button
              onClick={handleAddField}
              type='button'
              title='Add another field'
              className='fixed right-4 bottom-4 shadow-2xl shadow-slate-900 border bg-white my-4 flex gap-2 items-center text-zinc-700 rounded-full  p-2 font-bold'
            >
              <Plus size={32} weight='bold' />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditForm;
