'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserClick, setIsUserClick] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Your form submission logic here...

      // Assuming the form submission is successful, set isUserLoggedIn to true
      setIsUserLoggedIn(true);

      // Redirect the user to /
      router.push('/');
      // const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('photo', photo);
      // Send a POST request to the API route
      const response = await axios.post('/api/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); // Log the response from the API

      // Reset form fields
      setUsername("");
      setEmail("");
      setPhoto(null);
      setIsUserClick(false);
    } catch (error) {
      console.error('Error submitting form:', error);
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
     {/* Conditional rendering for sign-up form */}
     {isUserClick && (
        <div className='signup'>
          <form className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-900 backdrop-filter backdrop-blur-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col bg-black text-white p-6 rounded-lg">
              <div className="h-34 w-45 flex justify-end">
                <ClearIcon onClick={() => setIsUserClick(false)} />
              </div>
              <h3 className="mb-4">Sign up to Urban Sniffle</h3>

              <label htmlFor="username" className="flex flex-row border-black mb-2">
                Enter username
              </label>
              <input type="text" name="username" id="username" className="ml-2 border-2 border-black px-2 py-1 text-black" />

              <label htmlFor="email" className="mb-2">Enter email</label>
              <input type="email" name="email" id="email" className="border-2 border-black px-2 py-1 mb-2" />

              <label htmlFor="image" className="mb-2">Enter Image</label>
              <input type="file" name="image" id="image" className="border-2 border-black px-2 py-1 mb-2 text-black" />

              <button type="submit" className="mb-2 bg-white text-black px-4 py-2 rounded"   >Submit</button>
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
