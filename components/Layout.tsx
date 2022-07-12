import Navbar from './Navbar';

export default function Layout({ children }) {
	return (
		<div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col">
			<div className="bg-gradient-div fixed z-[-100] bg-indigo-500"></div>
			<div className="z-10 mx-auto w-full max-w-6xl flex-1 flex flex-col">
				<Navbar />
				<div className="flex-1 w-full flex flex-col">{children}</div>
			</div>
		</div>
	);
}
