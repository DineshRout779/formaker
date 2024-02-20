/* eslint-disable react/prop-types */
const InputType = ({ type }) => {
  switch (type) {
    case 'text':
      return <p className='text-sm border-b w-[60%]'>Short answer text</p>;
    default:
      return <p className='text-sm border-b w-full'>Long paragraph</p>;
  }
};

export default InputType;
