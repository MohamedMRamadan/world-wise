import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import useAuth from "../context/FakeAuth";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthanticated } = useAuth();
  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  useEffect(() => {
    if (isAuthanticated) navigate("/app", { replace: true });
  }, [isAuthanticated, navigate]);

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}
