const InputType = ({ type, ...props }) => {
  let inputComponent;

  switch (type) {
    case 'text':
      inputComponent = (
        <input
          {...props}
          className='outline-none border-b border-b-slate-200 py-2 focus-visible:border-b-slate-300 w-full bg-transparent'
        />
      );
      break;
    case 'paragraph':
      inputComponent = (
        <textarea
          {...props}
          className='outline-none border-b border-b-slate-200 py-2 focus-visible:border-b-slate-300 w-full bg-transparent'
        ></textarea>
      );
      break;
    case 'number':
      inputComponent = (
        <input
          type='number'
          {...props}
          className='outline-none border-b border-b-slate-200 py-2 focus-visible:border-b-slate-300 w-full bg-transparent'
        />
      );
      break;
    case 'email':
      inputComponent = (
        <input
          type='email'
          {...props}
          className='outline-none border-b border-b-slate-200 py-2 focus-visible:border-b-slate-300 w-full bg-transparent'
        />
      );
      break;
    case 'date':
      inputComponent = (
        <input
          type='date'
          {...props}
          className='outline-none border-b border-b-slate-200 py-2 focus-visible:border-b-slate-300 w-full bg-transparent'
        />
      );
      break;
    default:
      inputComponent = (
        <input
          {...props}
          className='outline-none border-b border-b-slate-200 py-2 focus-visible:border-b-slate-300 w-full bg-transparent'
        />
      );
      break;
  }

  return inputComponent;
};

export default InputType;
