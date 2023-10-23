import { AuthProvider } from '../../hooks/useAuth';

function keepLogin({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default keepLogin;
