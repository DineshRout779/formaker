/* eslint-disable react/prop-types */
const ResponseTable = ({ form }) => {
  return (
    <div className='p-4 overflow-hidden my-4 bg-white rounded-md shadow-md border '>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                  <tr>
                    <th scope='col' className='px-6 py-4'>
                      #
                    </th>
                    {form?.fields?.map((field) => (
                      <th key={field._id} scope='col' className='px-6 py-4'>
                        {field?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {form?.responses?.map((response, i) => (
                    <tr
                      key={response._id}
                      className='border-b transition duration-300 ease-in-out hover:bg-gray-100 '
                    >
                      <td className='whitespace-nowrap font-medium px-6 py-4'>
                        {i + 1}
                      </td>
                      {Object.values(response.data).map((value, j) => (
                        <td className='whitespace-nowrap px-6 py-4' key={j}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseTable;
