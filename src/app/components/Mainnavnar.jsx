"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebaseconfig"; // Adjust this import path as needed
import UserScoreDisplay from "./scores";
import Image from 'next/image';

const Mainnavbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (status === "authenticated" && session.user) {
        try {
          const userRef = doc(db, "users", session.user.id);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfilePictureUrl(userData.profilePictureUrl || null);
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    };

    fetchProfilePicture();
  }, [status, session]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsMenuOpen(false);
    router.push('');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-3xl font-bold text-green-600">
                <img src="images/logo-no-background.png" className='h-20' alt="Addicare" />
              </Link>
            </div>
            <div className="hidden lg:ml-10 lg:flex lg:space-x-12">
              {status === "authenticated" && (
                <>
                  <Link href="/userplans" className="text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-lg font-medium">
                    Start
                  </Link>
                  <Link href="/mood" className="text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-lg font-medium">
                    Mood Tracker
                  </Link>
                  <Link href="/community" className="text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-lg font-medium">
                    Community
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:items-center">
            {status === "authenticated" && (
              <>
                <UserScoreDisplay />
                <div className="ml-6 relative">
                  <div>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Image
                        className="h-12 rounded-full"
                        src={profilePictureUrl || "/default-avatar.png"}
                        alt=""
                        width={48}
                        height={48}
                        layout="intrinsic"
                      />
                    </button>
                  </div>
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                      <Link href="/profile" className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 w-full text-left">
                        Profile
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Link href="/authentication/login" className="text-gray-600 hover:text-gray-900 inline-flex items-center px-4 py-2 text-lg font-medium">
                  Login
                </Link>
                <Link href="/authentication/signup" className="ml-8 inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Mainnavbar;