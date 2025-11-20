function LogInButton({}) {
  const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const googleAuthUrl = `${BASE_API_URL}/api/auth/google`;

  return (
    <div>
      <a href={googleAuthUrl}>LogIn</a>
    </div>
  );
}

export default LogInButton;
