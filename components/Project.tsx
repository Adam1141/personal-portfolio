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
					className="cursor-pointer text-xl font-semibold"
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
				<div className="mx-4 flex flex-wrap gap-x-4 gap-y-2 rounded-lg bg-indigo-200 bg-opacity-50 p-2 px-4">
					{project.technologies.map((t, idx) => {
						return (
							<div
								onClick={() => {
									window.open(`http://google.com/search?q=${t}`);
								}}
								className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-70"
							>
								<Image
									key={`${t}${idx}`}
									width={48}
									height={48}
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
				className="relative min-h-72 flex-1 cursor-pointer"
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
