import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { backend } from "../axios";
import { useContext } from "react";
import { ThemeContext } from "../App";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  function validate() {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return false;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return false;
    }

    return true;
  }
  function handleLogin(e) {
    e.preventDefault();
    let isValid = validate();
    if (!isValid) {
      return;
    }
    const user = {
      username,
      password,
    };
    setLoading(true);
    backend
      .post("auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.accessToken);
          navigate("/", { state: { token: response.data.accessToken } });
        }
      })
      .catch((error) => {
        if (error.status == 404 || error.status == 401) {
          alert(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="login">
      <div className="container">
        <div className="bg-gray-50  dark:bg-[#1a202c]">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full">
              <div className="p-8 rounded-2xl bg-white shadow">
                <h2 className="text-gray-800 text-center text-2xl font-bold">
                  Sign in
                </h2>
                <form className="mt-8 space-y-4">
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Username
                    </label>
                    <div className="relative flex items-center">
                      <input
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        type="text"
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter username.."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type={show ? "text" : "password"}
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter password.."
                      />
                    </div>
                  </div>

                  {password.trim() && (
                    <div className="flex flex-wrap items-center justify-end select-none gap-4">
                      <div className="flex items-center">
                        <input
                          onClick={() => {
                            setShow(!show);
                          }}
                          id="check"
                          type="checkbox"
                          className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="check"
                          className="ml-3 block text-sm text-gray-800"
                        >
                          Show password
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="!mt-8">
                    <button
                      onClick={handleLogin}
                      type="button"
                      className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Sign in"}
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
