import { FC } from 'react';
import Image from 'next/image';
import { IProject } from '../@types/types';
import { TECH_ICONS_MAP } from '../constants';

interface IProjectProps {
	project: IProject;
	className?: string;
}

const Project: FC<IProjectProps> = ({ project, className }) => {
	return (
		<div
			className={`flex flex-col justify-start gap-8 p-4 sm:min-h-96 sm:flex-row sm:p-0 ${
				className ?? ''
			}`}
		>
			<div className="sm:flex-1">
				{/* project name */}
				<h2
					className="cursor-pointer text-xl font-semibold hover:scale-105 hover:opacity-80 transition-all duration-300 w-fit"
					onClick={() => {
						window.open(project.url);
					}}
				>
					{project.name}
				</h2>

				{/* project description */}
				<p className="px-4 py-2 text-justify text-gray-300">
					{project.description}
				</p>

				{/* project technologies  */}
				<div className="mx-4 flex mt-8 flex-wrap gap-x-4 gap-y-2 rounded-lg bg-indigo-200 bg-opacity-50 p-2 px-4">
					{project.technologies.map((t, idx) => {
						return (
							<div
								key={`${t}${idx}`}
								onClick={() => {
									window.open(`http://google.com/search?q=${t}`);
								}}
								className="relative w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-70"
							>
								<Image
									layout="fill"
									objectFit='contain'
									alt={`${t} logo`}
									src={`/tech-icons/${TECH_ICONS_MAP[t]}`}
								/>
							</div>
						);
					})}
				</div>
			</div>

			{/* project image */}
			<div
				onClick={() => window.open(project.url)}
				className="relative min-h-72 flex-1 cursor-pointer hover:opacity-80 hover:scale-[0.99] transition-all duration-300"
			>
				<Image
					src={`${project.imgUrl}`}
					alt={`${project.name} image`}
					objectFit="contain"
					layout="fill"
					objectPosition="top"
				/>
			</div>
		</div>
	);
};

export default Project;
