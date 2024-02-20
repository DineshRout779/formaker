import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchFormData = async () => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/form/${id}`,
          { signal }
        );
        setForm(response.data.form);
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchFormData();

    return () => {
      abortController.abort();
    };
  }, [id]);

  console.log(form);

  return <div>EditForm</div>;
};

export default EditForm;
