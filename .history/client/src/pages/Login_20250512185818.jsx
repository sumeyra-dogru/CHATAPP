import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      alert("Giriş başarısız!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold">Giriş Yap</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" required />
      <button type="submit" className="bg-blue-500 text-white p-2">Giriş</button>
    </form>
  );
}
