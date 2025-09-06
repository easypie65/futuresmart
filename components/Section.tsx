
import React from 'react';
import { Project, ProjectStatus } from '../types';
import ProjectCard from './ProjectCard';

interface SectionProps {
  title: string;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  status: ProjectStatus;
}

const Section: React.FC<SectionProps> = ({ title, projects, onSelectProject, status }) => {
  const titleColor = status === ProjectStatus.Success ? 'text-green-600' : 'text-amber-600';

  return (
    <section className="mb-16">
      <h2 className={`text-3xl font-bold mb-6 border-l-4 pl-4 ${status === ProjectStatus.Success ? 'border-green-500' : 'border-amber-500'}`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
        ))}
      </div>
    </section>
  );
};

export default Section;
