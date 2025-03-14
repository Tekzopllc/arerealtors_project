import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

interface LoginFormState {
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

const AdminLogin: React.FC = () => {
  console.log('AdminLogin component mounting');
  const navigate = useNavigate();
  
  // Particle background initialization
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };
  
  const [formState, setFormState] = useState<LoginFormState>({
    username: '',
    password: '',
    isLoading: false,
    error: null
  });

  useEffect(() => {
    console.log('AdminLogin component mounted');
    return () => console.log('AdminLogin component unmounting');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting login...');
    
    // Basic validation
    if (!formState.username || !formState.password) {
      console.log('Validation failed: Missing username or password');
      setFormState({
        ...formState,
        error: 'Username and password are required'
      });
      return;
    }
    
    setFormState({
      ...formState,
      isLoading: true,
      error: null
    });
    
    try {
      console.log('Querying Admin_Profiles table...');
      const { data, error } = await supabase
        .from('Admin_Profiles')
        .select()
        .eq('username', formState.username)
        .eq('password', formState.password)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.log('Invalid credentials');
        throw new Error('Invalid credentials');
      }

      console.log('Login successful!');
      
      // Store credentials in localStorage
      localStorage.setItem('acerealtors_username', formState.username);
      localStorage.setItem('acerealtors_pass', formState.password);
      
      // Reset form
      setFormState({
        username: '',
        password: '',
        isLoading: false,
        error: null
      });

      // Navigate to admin panel
      console.log('Navigating to admin panel...');
      navigate('/adminpanel');
      
    } catch (error) {
      console.error('Login error:', error);
      setFormState({
        ...formState,
        isLoading: false,
        error: 'Failed to login. Please check your credentials.'
      });
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Animated Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#f9fafb", // Light gray background matching the previous bg-gray-50
            },
          },
          particles: {
            color: {
              value: "#f97316", // Orange color to match theme
            },
            links: {
              color: "#f97316",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 30,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4 backdrop-blur-sm bg-opacity-95"
      >
        {/* Logo Animation */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
            className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-4"
          >
            Admin Login
          </motion.h1>
          
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: 0 }}
            className="relative h-24 w-24 mx-auto"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 opacity-50 blur-md"></div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Error Message Animation */}
        <AnimatePresence>
          {formState.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 border-l-4 border-red-600 overflow-hidden"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formState.error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 font-medium text-gray-700">
              Username
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <input
                type="text"
                id="username"
                name="username"
                value={formState.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                disabled={formState.isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-300
                          focus:border-orange-500 focus:outline-none focus:ring-3 focus:ring-orange-500/20
                          hover:border-orange-300 disabled:bg-gray-100 shadow-sm"
              />
            </motion.div>
          </div>
          
          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                disabled={formState.isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-300
                          focus:border-orange-500 focus:outline-none focus:ring-3 focus:ring-orange-500/20
                          hover:border-orange-300 disabled:bg-gray-100 shadow-sm"
              />
            </motion.div>
          </div>
          
          {/* Login Button */}
          <div className="mb-5">
            <motion.button
              type="submit"
              disabled={formState.isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg
                        transition-all hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400
                        disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/30"
            >
              {formState.isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : 'Login'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;