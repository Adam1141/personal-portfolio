import { m } from 'framer-motion';
import ProjectsList from '../components/ProjectsList';
import { PROJECTS_LIST } from '../constants';

const Work = () => {
	return (
		<m.div className="flex flex-1 flex-col basis-0 overflow-hidden">
			<ProjectsList projects={PROJECTS_LIST} />
		</m.div>
	);
};

export default Work;
