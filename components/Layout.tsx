import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<div className="h-screen w-screen overflow-y-auto overflow-x-hidden">
			<div className="bg-gradient-div fixed z-[-100] bg-indigo-500"></div>
			<div className="z-10 mx-auto h-full w-full max-w-6xl">
				<Navbar />
				<div className="h-[100%-16] w-full">{children}</div>
			</div>
		</div>
	);
}
