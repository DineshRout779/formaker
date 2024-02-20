import { useState } from 'react';
import FormItem from '../components/FormItem';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchForms = async () => {
      console.log('called');
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/form`, {
          signal,
        });
        setForms(response.data.forms);
      } catch (err) {
        console.log(err);
      }
    };

    fetchForms();

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

        <ul className='space-y-2'>
          {forms.map((form) => (
            <FormItem form={form} key={form._id} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
