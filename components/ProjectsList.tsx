import { FC } from 'react';
import { IProject } from '../@types/types';
import Project from './Project';

interface IProjectsListProps {
	projects: IProject[];
}

const ProjectsList: FC<IProjectsListProps> = ({ projects }) => {
	return (
		<div
			className={`custom-scrollbar flex flex-1 flex-col gap-y-16 pr-4 sm:gap-y-32 overflow-y-auto py-16 px-4`}
		>
			{projects.map((p, idx) => {
				return (
					<Project
						key={p.id}
						project={p}
						className={`${idx % 2 == 0 ? '' : 'sm:flex-row-reverse'}`}
					/>
				);
			})}
		</div>
	);
};

export default ProjectsList;
