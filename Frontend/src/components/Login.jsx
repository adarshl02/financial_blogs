import React from 'react';

export default function Login({handleSignupOpen}) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-50 text-slate-700 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="mb-4">Glad you're back!</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" className="mt-1 w-full px-4 py-2  border-2 border-gray-400  rounded-lg  text-base focus:ring focus:ring-blue-400 focus:outline-none" placeholder="Username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="mt-1 w-full px-4 py-2  border-2 border-gray-400 rounded-lg  text-base focus:ring focus:ring-blue-400 focus:outline-none" placeholder="Password" />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2 " />
            <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white p-2 rounded shadow">Login</button>
          <div className="text-right mt-2">
            <a href="#" className="text-blue-500">Forgot password?</a>
          </div>
        </form>
        <div className="mt-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-white border border-gray-300  p-2 rounded-full flex items-center shadow">
            <img src="./google.png" alt="Google" className="w-6 h-6 " />
            
          </button>
          <button className="bg-white border border-gray-300 p-2 rounded-full flex items-center shadow">
            <img src="./facebook.png" alt="Facebook" className="w-6 h-6" />
            
          </button>
          <button className="bg-white border border-gray-300 p-2 rounded-full flex items-center shadow">
            <img src="./github.png" alt="GitHub" className="w-6 h-6" />
          </button>
        </div>
          <div className="mt-4 text-center">
          <button onClick={handleSignupOpen} className="text-blue-500">
          Don't have an account? Signup
          </button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-500 gap-6">
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  );
}
