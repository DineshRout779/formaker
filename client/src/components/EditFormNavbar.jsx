/* eslint-disable react/prop-types */
import { Check, CircleNotch, CloudCheck, Eye } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { editForm } from '../services/form';

const EditFormNavbar = ({ formId, form, autoSave }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const saveForm = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await editForm(formId, form);

      console.log(res);
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  }, [formId, form]);

  useEffect(() => {
    if (autoSave) {
      const timer = setTimeout(() => {
        saveForm();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [autoSave, form, formId, saveForm]);

  // console.log('f: ', form);

  return (
    <div>
      <div className='flex py-4 justify-between items-center container-max'>
        <Link to='/'>
          <h1 className='text-2xl font-semibold' title='Formaker Logo'>
            Formaker 🚀
          </h1>
        </Link>
        <div className='flex gap-3 items-center'>
          <button
            title='Save form'
            onClick={saveForm}
            className='flex text-sm items-center gap-2'
          >
            Saved
            {isLoading ? (
              <span className='animate-spin font-medium'>
                <CircleNotch size={16} />
              </span>
            ) : (
              <CloudCheck size={16} weight='bold' />
            )}
          </button>

          <Link
            title='Preview'
            to={`/forms/${form._id}/share`}
            target='_blank'
            className='bg-white font-medium border border-purple-600 flex gap-2 items-center text-purple-600 rounded-full hover:shadow-xl p-2 px-6'
          >
            Preview <Eye size={16} weight='bold' />
          </Link>

          <button
            title='Finish'
            onClick={() => navigate(`/`)}
            className='bg-purple-600 font-medium border border-purple-600 flex gap-2 items-center text-white rounded-full hover:shadow-xl p-2 px-6'
          >
            Done <Check size={16} weight='bold' />
          </button>
        </div>
      </div>
      <div className='flex text-sm justify-center items-center'>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'border-b-4 p-2 px-4 border-b-purple-600 '
              : 'border-b-4 p-2 px-4 border-b-transparent'
          }
          to={`/forms/${formId}/edit`}
        >
          Questions
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'border-b-4 p-2 px-4 border-b-purple-600 '
              : 'border-b-4 p-2 px-4 border-b-transparent'
          }
          to={`/forms/${formId}/responses`}
        >
          Responses ({form?.responses ? form.responses.length : null})
        </NavLink>
      </div>
    </div>
  );
};

export default EditFormNavbar;
