import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backend } from "../axios";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function validate() {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      alert("Invalid email format!");
      return false;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return false;
    }

    if (password !== rePassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  }
  function handleRegister(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    let user = {
      username,
      email,
      password,
    };
    setLoading(true);
    backend
      .post("auth/signup", user, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setUsername("");
          setEmail("");
          setPassword("");
          setRePassword("");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          alert(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="register">
      <div className="container">
        <div className="flex flex-col justify-center sm:h-screen p-4">
          <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-7 dark: bg-white">
            <div className="text-center mb-12">
              <h2 className="text-gray-800 text-center text-2xl font-bold">
                Sign Up
              </h2>
            </div>

            <form>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Username.."
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Email.."
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type={show ? "text" : "password"}
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter password.."
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Confirm Password
                  </label>
                  <div>
                    <input
                      value={rePassword}
                      onChange={(e) => {
                        setRePassword(e.target.value);
                      }}
                      type={show ? "text" : "password"}
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter Confirm password.."
                    />
                  </div>
                </div>
              </div>

              {password.trim() && (
                <div className="flex items-center justify-end !mt-6 select-none ">
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
                    className="text-gray-800 ml-3 block text-sm"
                  >
                    Show password
                  </label>
                </div>
              )}

              <div className="!mt-6">
                <button
                  onClick={handleRegister}
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Create an account"}
                </button>
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
