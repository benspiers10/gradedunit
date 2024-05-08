// const [data, setData] = useState([])
//     useEffect(()=> {
//         fetch('http://localhost:8081/users')
//         .then(res => res.json())
//         .then(data => setData(data))
//         .then(err => console.log(err));
//     }, [])

//     <div className="App">
//         <table >
//             <thead>
//                 <th className="bg-orange-600 p-3">ID</th>
//                 <th className="bg-red-600 p-3">Username</th>
//                 <th className="bg-blue-600 p-3">Helper</th>
//                 <th className="bg-green-600 p-3">Email</th>
//             </thead>

//             <tbody>
//                 {data.map((d, i) => (
//                     <tr key={i}>
//                         <td>{d.id}</td>
//                         <td>{d.username}</td>
//                         <td>{d.helper}</td>
//                         <td>{d.email}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//       </div>


//  THIS IS FOR USER INFO NAV 

//   const user = UserInfo();

//   const handleLogout = () => {
//     // Remove the token from local storage
//     localStorage.removeItem('token');

//     // Redirect to the login page or another desired route
//   navigate('/');
//   };

//   if (!user) {
//     return <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-[#75B9BE]">
//       {/* Left side */}
//       <div className="flex items-center">
//         <div onClick={() => setNav(!nav)} className="cursor-pointer">
//           <AiOutlineMenu size={30} />
//         </div>
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
//           Medi <span className="font-bold">Care</span>
//         </h1>
//       </div>

//       {/* Mobile Menu */}
//       {/* Overlay */}
//       {nav ? (
//         <div className="bg-navigation/80 fixed w-full h-screen z-10 top-0 left-0"></div>
//       ) : (
//         ""
//       )}

//       {/* Side drawer menu */}
//       <div
//         className={
//           nav
//             ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
//             : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
//         }
//       >
//         <AiOutlineClose
//           onClick={() => setNav(!nav)}
//           size={30}
//           className="absolute right-4 top-4 cursor-pointer"
//         />
//         <h2 className="text-2xl p-4 bg-navigation">
//           Medi <span className="font-bold">Care</span>
//         </h2>
//         <Link to="/">
//           <div className="flex items-center gap-5 ml-10">
//           <FaHome size={50}/>
//           <h1>Home</h1>
//           </div>
//           </Link>

//           <Link to="/Login">
//           <div>
//           <h1>Login</h1>
//           </div>
//           </Link>

//       </div>
//     </div>;
//   }

