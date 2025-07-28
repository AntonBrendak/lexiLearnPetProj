import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Inputs/Input";
import { Button } from "../components/ui/Buttons/Button"; // новий компонент!
import { LoginForm } from "../components/ui/Forms/LoginForm";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(identifier, password);
      if (result.success) {
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-1">
        Sign in
      </h1>
      <Input
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Email or Nickname"
        width={260}
        height={44}
        center
        autoFocus
        mb={12}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        width={260}
        height={44}
        center
        mb={14}
      />
      <Button
        type="submit"
        mt={2}
        center
        variant="primary"
      >
        Login
      </Button>
      <Button
        type="button"
        mt={4}
        center
        variant="danger"
        onClick={handleGoogle}
      >
        Login with Google
      </Button>
      <div className="text-center text-gray-500 text-xs mt-2">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline font-semibold"
        >
          Register
        </a>
      </div>
      <div className="text-center text-gray-500 text-xs">
        Forgot your password?{" "}
        <a
          href="/forgot-password"
          className="text-blue-600 hover:underline font-semibold"
        >
          Reset it here
        </a>
      </div>
    </LoginForm>
  );
}