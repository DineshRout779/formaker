/* eslint-disable react/prop-types */

const AnswerType = ({ type }) => {
  switch (type) {
    case 'text':
      return <p className='text-sm border-b w-[60%]'>Short answer text</p>;
    case 'paragraph':
      return <p className='text-sm border-b w-full'>Long paragraph</p>;
    case 'number':
      return <p className='text-sm border-b w-full'>Number</p>;
    case 'date':
      return <p className='text-sm border-b w-full'>Date</p>;
    case 'email':
      return <p className='text-sm border-b w-full'>Email</p>;
    default:
      return <p className='text-sm border-b w-full'>Short answer text</p>;
  }
};

export default AnswerType;
