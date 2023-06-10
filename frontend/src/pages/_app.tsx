import { store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageWithLayout } from 'src/types/page';

interface AppPropsWithLayout extends AppProps {
  Component: PageWithLayout;
}

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    window?.ethereum?.on('accountsChanged', () => router.reload());
  }, [router]);

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer position="top-center" newestOnTop />
    </Provider>
  );
};

export default App;
