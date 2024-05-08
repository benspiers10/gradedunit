// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [patientNumber, setPatientNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [parent, setParent] = useState(false); // state for the checkbox
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log('Making login request with:', { patientNumber, password });
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         patientNumber,
//         password,
//       });
      
//       // Handle successful login
//       console.log('Login Successful')
//       const { token } = response.data;
//       localStorage.setItem('Token', token);

//       if (parent) {
//         navigate('/ParentDash');
//       } else {
//         navigate('/Dash');
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error('Login failed: Invalid credentials');
//         alert('Login failed: Invalid credentials');
//         // Handle unauthorized access
//       } else {
//         console.error('Login failed:', error.message);
//         alert('Login failed:', error.message);
//         // Handle other errors
//       }
//     }
//   };

//   useEffect(() => {
//     const storedParent = localStorage.getItem('parent');
//     if (storedParent) {
//       const parsedParent = JSON.parse(storedParent);
//       setParent(parsedParent);
//     }
//   }, []);

//   return (
//     <>
// <div className='min-h-screen flex items-center justify-center dark:bg-gray-950'>
// 	<div className='bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md'>

// 		<h1 className='text-2xl font-bold text-center mb-4 dark:text-gray-200'>Welcome Back!</h1>
// 		<form>
// 			<div className='mb-4'>
// 				<label for='patientNumber' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Patient Number</label>
//         <input
//           className='border rounded-lg shadow-md min-w-[500px] p-2 text-left'
//           type='string'
//           id='patientNumber'
//           placeholder='Patient Number'
//           onChange={(e) => setPatientNumber(e.target.value)}
//           value={patientNumber}
//         />
// 			</div>
// 			<div className='mb-4'>
// 				<label for='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Password</label>
// 				<input
//           className='border rounded-lg shadow-md min-w-[500px] p-2 text-left'
//           type='password'
//           id='string'
//           placeholder='Password'
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         />
//         <label htmlFor='parentStatus' className='flex items-center gap-2'>
//           Parent/Guardian?
//           <input
//             type='checkbox'
//             id='parentStatus'
//             name='parentStatus'
//             onChange={(e) => setParent(e.target.checked)}
//             value={parent}
//           />
//         </label>
// 				<a href='#'
// 					class='text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Forgot
// 					Password?</a>
// 			</div>
// 			<div className='btn_container mt-10 text-center'>
//         <input
//           onClick={handleLogin}
//           type='submit'
//           className='text-2xl bg-[#1C3925] text-white min-w-[250px] px-2 py-3 rounded-full shadow-lg font-body cursor-pointer hover:translate-y-2 transition-transform'
//         />
//         <div className='forgot_password my-2 text-blue-700 cursor-pointer'>
//           Forgot Password?
//         </div>
//       </div> 
// 		</form>
// 	</div>
// </div>
//     </>
//   );
// };

// export default Login;