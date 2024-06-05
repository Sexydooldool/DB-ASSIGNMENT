import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Nav = ({ user, setUser, isloggedIn, setIsLoggedIn }) => {
	const [input, setInput] = useState('');
	const location = useLocation();

	const fetchUser = async (userId) => {
		try {
			const response = await fetch(`http://localhost:8001/v1/user/${userId}`);
			const data = await response.json();

			if (response.ok) {
				setUser(data);
				setIsLoggedIn(true);

				localStorage.setItem('user', JSON.stringify(data));
				localStorage.setItem('isloggedIn', true);
				console.log('User fetched:', data);
			} else {
				console.error('Error fetching user:', data);
				alert('User not found');
			}
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const loginhandler = (userId) => {
		if (isloggedIn) {
			setUser(null);
			setIsLoggedIn(false);
			localStorage.removeItem('user');
			localStorage.removeItem('isloggedIn');
			window.location.href = '/';
		} else if (userId > 0) {
			fetchUser(userId);
		}
		else {
			alert('Please enter a valid User ID');
		}
	};

	return (
		<nav className="fixed bg-opacity-30 p-4 bg-slate-950 backdrop-blur-xl z-40 w-full border-b-[1px] border-slate-600 border-opacity-50">
			<div className="max-w-screen-lg mx-auto flex justify-between">
				<Link to="/" className="flex gap-1 hover:text-slate-300 py-1">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
					</svg>
					<span className="font-bold">
						DBRS
					</span>
				</Link>

				<div className={`gap-[1px] transition-all ml-1 flex *:bg-opacity-60 *:py-1 items-center text-slate-50`}>
					{location.pathname !== '/search' &&
						<Link to="/search" className={`text-slate-50 hover:text-slate-400 transition-all px-4`}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
							</svg>
						</Link>
					}

					{isloggedIn ?
						<Link
							to={`/user/${user.userId}`}
							className={`bg-slate-800 hover:text-slate-400 transition-all px-2 flex gap-1 items-center rounded-s-full`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							</svg>
							User {user.userId}
						</Link> :
						<input
							id='selectUser'
							type="text"
							placeholder={isloggedIn ? user.userId : "User ID"}
							className={`bg-slate-800 rounded-s-full transition-all px-4 w-24 disabled:bg-slate-800 focus:bg-slate-800`}
							disabled={isloggedIn}
							onChange={(e) => setInput(e.target.value)}
						/>
					}
					<button
						onClick={() => loginhandler(input)}
						className={`bg-slate-800 pl-2 pr-4 rounded-e-full hover:text-slate-400 transition-all`}
					>
						{isloggedIn ? "Logout" : "Login"}
					</button>
				</div>
			</div>
		</nav >
	);
};

export default Nav;