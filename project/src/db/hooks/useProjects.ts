import { useLiveQuery } from 'dexie-react-hooks';
import { projectsRepository } from '../repositories/projects';

export const useProjects = () => {
  const projects = useLiveQuery(() => projectsRepository.getAll());
  
  return {
    projects,
    loading: projects === undefined,
    error: projects === null
  };
};

export const useProject = (id: number) => {
  const project = useLiveQuery(() => projectsRepository.getById(id), [id]);
  
  return {
    project,
    loading: project === undefined,
    error: project === null
  };
};

export const useActiveProjects = () => {
  const projects = useLiveQuery(() => projectsRepository.getActive());
  
  return {
    projects,
    loading: projects === undefined,
    error: projects === null
  };
};