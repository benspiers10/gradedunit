import { useEffect, useState } from "react";
import $ from "jquery";
// import logo from './logo.svg';
import './App.css';

function App() {
    const [data, setData] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8081/users')
        .then(res => res.json())
        .then(data => setData(data))
        .then(err => console.log(err));
    }, [])

  return (
      <div className="App">
        <table >
            <thead>
                <th className="bg-orange-600 p-3">ID</th>
                <th className="bg-red-600 p-3">Username</th>
                <th className="bg-blue-600 p-3">Helper</th>
                <th className="bg-green-600 p-3">Email</th>
            </thead>

            <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.username}</td>
                        <td>{d.helper}</td>
                        <td>{d.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
  );
}

export default App;