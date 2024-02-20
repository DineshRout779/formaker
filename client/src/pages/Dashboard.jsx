import FormItem from '../components/FormItem';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div className='container-max'>
      <Navbar />

      <section id='list-of-forms' className='my-4'>
        <h2 className='text-base mb-4'>All forms</h2>

        <ul className='space-y-2'>
          <FormItem />
          <FormItem />
          <FormItem />
          <FormItem />
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
