import dynamic from 'next/dynamic';

const DynamicLoginForm = dynamic(() => import('../../api/auth/login'), {
  ssr: false,
});

const LoginRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logo-no-background.png" className="h-20 mx-auto mb-8" alt="Addicare" />
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
        </div>
        <DynamicLoginForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/authentication/signup" className="font-medium text-gray-600 hover:text-gray-500">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRoute;
