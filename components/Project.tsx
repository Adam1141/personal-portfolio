import { m } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { IProject } from '../@types/types';

interface IProjectProps {
	project: IProject;
	className?: string;
}

const Project: FC<IProjectProps> = ({ project, className }) => {

	return (
		<m.div
			className={`flex flex-col justify-start gap-8 p-4 sm:min-h-96 sm:flex-row sm:p-0 ${
				className ?? ''
			}`}
		>
			<div className="sm:flex-1">
				<h2
					className="cursor-pointer text-xl font-semibold"
					onClick={() => {
						window.open(project.url);
					}}
				>
					{project.name}
				</h2>
				<p className="px-4 py-2 text-justify text-gray-300">
					{project.description}
				</p>
			</div>
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
		</m.div>
	);
};

export default Project;
