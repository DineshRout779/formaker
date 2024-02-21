import { useState } from 'react';
import FormItem from '../components/FormItem';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { deleteForm, getAllforms } from '../services/form';

const Dashboard = () => {
  const [forms, setForms] = useState([]);

  const handleDelete = async (form) => {
    try {
      const res = await deleteForm(form._id);

      if (res.status === 200) {
        setForms(forms.filter((f) => f._id !== form._id));
        toast.success('Form deleted');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchAllForms = async () => {
      try {
        const response = await getAllforms(signal);
        setForms(response.data.forms);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllForms();

    return () => {
      abortController.abort();
    };
  }, []);

  // console.log(forms);

  return (
    <div className='container-max'>
      <Navbar />

      <section id='list-of-forms' className='my-4'>
        <h2 className='text-base mb-4'>All forms</h2>

        <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {forms.map((form) => (
            <FormItem form={form} key={form._id} onDelete={handleDelete} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
