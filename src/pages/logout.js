// pages/logout.js
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
