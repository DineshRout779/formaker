/* eslint-disable react/prop-types */
const ResponseRows = ({ form }) => {
  return (
    <div>
      {form?.fields?.map((field) => (
        <article
          key={field._id}
          className='p-4 my-4 bg-white rounded-md shadow-md border '
        >
          <h2 className='text-base mb-4'>{field?.label}</h2>

          <ul className='space-y-1'>
            {form?.responses?.map((response) => (
              <li
                key={response._id}
                className='text-[14px] p-1 px-2 rounded-md bg-gray-100 text-gray-700'
              >
                {response.data[field.label]}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default ResponseRows;
