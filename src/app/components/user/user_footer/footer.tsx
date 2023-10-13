import React from 'react';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='container mx-auto flex flex-col items-center'>
        <div className='flex space-x-4 mb-4'>
          <a href='#' className='footer-link'>
            Home
          </a>
          <a href='#' className='footer-link'>
            About Us
          </a>
          <a href='#' className='footer-link'>
            Services
          </a>
          <a href='#' className='footer-link'>
            Contact
          </a>
        </div>
        <p className='text-gray-300 text-center'>
          &copy; 2023 Your Website. All rights reserved.
        </p>
        <div className='mt-4 flex space-x-4'>
          <a href='#' className='social-icon'>
            Facebook
          </a>
          <a href='#' className='social-icon'>
            Twitter
          </a>
          <a href='#' className='social-icon'>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
