// pages/login.js
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", {
            username: e.target.username.value,
            password: e.target.password.value,
          });
        }}
      >
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
