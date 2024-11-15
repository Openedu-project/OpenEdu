// import Image from '@oe/ui/components/common/image';

import { useTranslations } from 'next-intl';
import LoginForm from './login-form';

const Login = () => {
  const tAuth = useTranslations('auth');
  return (
    <>
      <h1 className="text-center text-2xl text-primary">{tAuth('login')}</h1>
      <LoginForm />
    </>
  );
};

export default Login;
