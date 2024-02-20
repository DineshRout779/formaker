/* eslint-disable react/prop-types */
import { PaperPlaneTilt, PencilSimple, TrashSimple } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const FormItem = ({ form, onDelete }) => {
  const navigate = useNavigate();

  const handleShare = () => navigate(`/forms/${form._id}/share`);
  const handleDelete = (form) => onDelete(form);
  const handleEdit = () => navigate(`/forms/${form._id}/edit`);

  return (
    <li
      title={form.title}
      className='rounded-md p-4 flex flex-col bg-white hover:shadow-md shadow-sm border'
    >
      <div className='grow'>
        <p className='font-semibold'>{form.title} </p>
        <small className='text-gray-500 text-xs'>
          {new Date().toDateString()}
        </small>
      </div>
      <div className='flex gap-2 mt-4 flex-wrap'>
        <button
          title='Edit form'
          onClick={handleEdit}
          className='p-2 rounded-md bg-gray-100 hover:bg-gray-200'
        >
          <PencilSimple size={24} color='#7b20c5' />
        </button>
        <button
          onClick={handleShare}
          title='Share form'
          className='p-2 rounded-md bg-gray-100 hover:bg-gray-200'
        >
          <PaperPlaneTilt size={24} color='#7b20c5' />
        </button>
        <button
          onClick={() => handleDelete(form)}
          title='Delete form'
          className='p-2 rounded-md bg-gray-100 hover:bg-gray-200'
        >
          <TrashSimple size={24} color='#7b20c5' />
        </button>
      </div>
    </li>
  );
};

export default FormItem;
