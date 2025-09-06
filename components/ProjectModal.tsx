
import React from 'react';
import { Project, ProjectType, ProjectStatus } from '../types';
import XMarkIcon from './icons/XMarkIcon';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const DemoComponent = project.component;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon />
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6">
            <div className="bg-white p-4 rounded-lg shadow-inner mb-6">
                <h4 className="font-semibold text-lg mb-2 text-indigo-700">요구사항 (Goal)</h4>
                <p className="text-gray-700">{project.goal}</p>
            </div>

            {project.status === ProjectStatus.Failure && project.failurePoint && (
                <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-4 rounded-r-lg shadow-inner mb-6" role="alert">
                    <h4 className="font-bold text-lg mb-2">성장의 기회 (실패 원인)</h4>
                    <p>{project.failurePoint}</p>
                </div>
            )}
            
            <div className="mt-4">
              {project.type === ProjectType.Link && project.link ? (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                        src={project.link}
                        title={project.title}
                        className="w-full h-[60vh]"
                        allow="fullscreen"
                    />
                </div>
              ) : DemoComponent ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <DemoComponent />
                </div>
              ) : (
                <p>데모를 표시할 수 없습니다.</p>
              )}
            </div>
        </div>
        
        <footer className="p-4 bg-gray-100 border-t border-gray-200 flex justify-end">
            {project.type === ProjectType.Link && project.link && (
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                    새 탭에서 열기
                </a>
            )}
        </footer>
      </div>
    </div>
  );
};

export default ProjectModal;
