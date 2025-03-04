// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleLogin = async (event) => {
//         event.preventDefault();
//         setError('');

//         try {
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password })
//             });

//             const contentType = response.headers.get('content-type');
//             if (!contentType || !contentType.includes('application/json')) {
//                 throw new Error('Unexpected response format');
//             }

//             const data = await response.json();
//             if (response.ok) {
//                 alert('Logged in successfully');
//                 console.log(data);
//                 navigate('/filter'); // Redirect to FilterPage
//             } else {
//                 throw new Error(data.message);
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Login to Vignan Alumni Management Portal</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="form-group">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="login-button">Login</button>
//                 </form>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Unexpected response format');
            }

            const data = await response.json();
            if (response.ok) {
                alert('Logged in successfully');
                navigate('/selection'); // Redirect to SelectionPage
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login to Vignan Alumni Management Portal</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;