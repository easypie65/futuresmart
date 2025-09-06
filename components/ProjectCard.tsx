import React from 'react';
import { Project, ProjectStatus } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const isSuccess = project.status === ProjectStatus.Success;
  const cardBorderColor = isSuccess ? 'border-green-500' : 'border-amber-500';
  const buttonBgColor = isSuccess ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-600 hover:bg-gray-700';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-4 ${cardBorderColor} flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
      onClick={() => onSelectProject(project)}
    >
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
        <p className="text-gray-600 text-sm">{project.description}</p>
        {project.status === ProjectStatus.Failure && project.failurePoint && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-xs text-amber-800 font-semibold">실패 원인:</p>
                <p className="text-xs text-amber-700 mt-1">{project.failurePoint}</p>
            </div>
        )}
      </div>
      <div className="p-6 pt-0 mt-auto">
        <button className={`w-full ${buttonBgColor} text-white font-bold py-2 px-4 rounded-md transition-colors`}>
          살펴보기
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;