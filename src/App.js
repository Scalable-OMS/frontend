import './App.css';
import AuthProvider from './context/Auth/provider/AuthProvider';
import Layout from './pages/Layout';

const App = () => {
  return (
    <AuthProvider>
		<Layout />
	</AuthProvider>
  );
}

export default App;
