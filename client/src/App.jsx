import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster position='bottom-center' reverseOrder={false} />
      <Outlet />
    </div>
  );
}

export default App;
