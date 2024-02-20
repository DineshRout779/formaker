/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const FormItem = ({ form }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/edit/${form._id}`)}
      className='cursor-pointer p-4 rounded-md block bg-white hover:shadow-md shadow-sm border'
    >
      <p>{form.title} </p>
      <small className='text-gray-500'>{new Date().toLocaleDateString()}</small>
    </li>
  );
};

export default FormItem;
