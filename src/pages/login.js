// src/pages/login.js
import { signIn } from "next-auth/react";

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username: event.target.username.value,
      password: event.target.password.value,
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      console.error("Login failed", res.error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}
