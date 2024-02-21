import { Plus } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createForm } from '../services/form';

const Navbar = () => {
  const navigate = useNavigate();

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

  return (
    <div className='flex py-4 justify-between items-center'>
      <Link to='/'>
        <h1 className='text-2xl font-semibold' title='Formaker Logo'>
          Formaker 🚀
        </h1>
      </Link>
      <button
        title='Create a new form'
        onClick={createNewForm}
        className='bg-purple-600 flex gap-2 items-center text-white rounded-full hover:shadow-xl p-2 px-6'
      >
        Create <Plus size={16} />
      </button>
    </div>
  );
};

export default Navbar;
