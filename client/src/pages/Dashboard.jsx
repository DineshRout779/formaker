import { useState } from 'react';
import FormItem from '../components/FormItem';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { createForm, deleteForm, getAllforms } from '../services/form';
import { useNavigate } from 'react-router-dom';
import { CircleNotch } from 'phosphor-react';
import Logo from '../components/Logo';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const createNewForm = async () => {
    try {
      const res = await createForm();

      if (res.status === 201) {
        toast.success('Form created');
        navigate(`/forms/${res.data.form._id}/edit`);
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
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      }
    };

    fetchAllForms();

    return () => {
      abortController.abort();
    };
  }, []);

  // console.log(forms);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircleNotch size={32} className='text-purple-600 animate-spin' />
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className='container-max'>
        <Navbar />
        <div className='min-h-[80vh] flex justify-center text-center items-center flex-col'>
          <Logo />
          <h1 className='text-4xl md:text-6xl my-8 leading-tight tracking-wide font-extrabold'>
            Create Seamless Forms, Gather Insights
          </h1>
          <div className='flex font-medium items-center gap-2'>
            <button className='w-[150px] bg-white border-2 border-purple-500 text-purple-500 flex gap-2 items-center justify-center tracking-wider rounded-full hover:shadow-xl p-2 px-6'>
              Learn more
            </button>
            <button
              onClick={createNewForm}
              className='w-[150px] bg-purple-500 border-2 border-purple-500 text-white flex gap-2 items-center justify-center tracking-wider rounded-full hover:shadow-xl p-2 px-6'
            >
              Try it
            </button>
          </div>
          <p className='fixed bottom-0 mx-auto py-4'>
            Made by{' '}
            <a
              className='text-purple-500'
              target='_blank'
              rel='noreferrer'
              href='https://github.com/DineshRout779'
            >
              Dinesh Rout
            </a>
          </p>
        </div>
      </div>
    );
  }

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
