import { Plus } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const createNewForm = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/form`);

      if (res.status === 201) {
        navigate(`/edit/${res.data.form._id}`);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className='flex py-4 justify-between items-center'>
      <h1 className='text-2xl font-semibold' title='Formaker Logo'>
        Formaker 🚀
      </h1>
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
