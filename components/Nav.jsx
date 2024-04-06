'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/navigation"; // Corrected import from "next/navigation"

const Nav = () => {
  const router = useRouter();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserClick, setIsUserClick] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profile: null // Initialize profile as null for file upload
  });

  const signIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('profile', user.profile); // Append profile image to FormData

      const response = await axios.post('/api/auth/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("User signed in", response.data);
      router.push('/');
      setIsUserClick(false);
      setIsUserLoggedIn(true);
    } catch (err) {
      console.log("Failed to sign in", err.message);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    console.log(File);
    if (file) {
      setUser({ ...user, profile: file });
    }
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' className='outline_btn' onClick={() => setIsUserLoggedIn(false)}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/images/profile.jpg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <button
            type='button'
            className='black_btn'
            onClick={() => setIsUserClick(true)}
          >
            Sign in
          </button>
        )}
      </div>

      {/* Conditional rendering for sign-up form */}
      {isUserClick && (
        <div className='signup'>
          <form
            className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-900 backdrop-filter backdrop-blur-lg"
            onSubmit={signIn}
          >
            <div className="flex flex-col bg-black text-white p-6 rounded-lg">
              <div className="h-34 w-45 flex justify-end">
                <ClearIcon onClick={() => setIsUserClick(false)} />
              </div>
              <h3 className="mb-4">Sign up to Urban Sniffle</h3>

              <label htmlFor="username" className="flex flex-row border-black mb-2">
                Enter username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="ml-2 border-2 border-black px-2 py-1 text-black"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Enter username"
              />

              <label htmlFor="email" className="mb-2">Enter email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 border-black px-2 py-1 mb-2 text-black"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter email"
              />

              <label htmlFor="password" className="mb-2">Enter password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="border-2 border-black px-2 py-1 mb-2 text-black"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter password"
              />

              <label htmlFor="profile" className="mb-2">Upload profile image</label>
              <input
                type="file"
                accept="image/*"
                name="profile"
                id="profile"
                className="border-2 border-black px-2 py-1 mb-2 text-white"
                onChange={handleProfileChange}
              />

              <button type="submit" className="mb-2 bg-white text-black px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/profile.jpg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type='button'
            className='black_btn'
            onClick={() => setIsUserClick(true)}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
