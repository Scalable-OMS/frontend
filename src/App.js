import './App.css';
import AuthProvider from './context/Auth/provider/AuthProvider';
// import CommonProvider from './context/Common/provider/CommonProvider';
import Layout from './pages/Layout';

const App = () => {
  return (
    <AuthProvider>
		{/* <CommonProvider> */}
			<Layout />
		{/* </CommonProvider> */}
	</AuthProvider>
  );
}

export default App;
