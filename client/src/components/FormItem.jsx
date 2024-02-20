import { useNavigate } from 'react-router-dom';

const FormItem = () => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate(`/forms`)}
      className='cursor-pointer p-4 rounded-md block bg-white hover:shadow-md shadow-sm border'
    >
      <p>Frontend Internship</p>
      <small className='text-gray-500'>{new Date().toLocaleDateString()}</small>
    </li>
  );
};

export default FormItem;
