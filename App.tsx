
import React, { useState, useCallback } from 'react';
import { PROJECTS } from './constants';
import { Project, ProjectStatus } from './types';
import Header from './components/Header';
import Section from './components/Section';
import ProjectModal from './components/ProjectModal';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const successProjects = PROJECTS.filter(p => p.status === ProjectStatus.Success);
  const failureProjects = PROJECTS.filter(p => p.status === ProjectStatus.Failure);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">바이브 코딩 연수 자료</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <span className="font-semibold text-indigo-600">바이브 코딩이란?</span> Google AI Studio를 활용해 아이디어를 빠르게 웹으로 구현하는 코딩 방식입니다. 성공과 성장의 경험을 함께 살펴보세요.
            </p>
        </div>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Vibe Coding 시작하기: Google AI Studio 가이드</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">접속 및 로그인:</span>{' '}
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">
                aistudio.google.com
              </a>
              에 방문하여 Google 계정으로 로그인합니다.
            </li>
            <li>
              <span className="font-semibold">프로젝트 생성:</span> 'Build with Gemini' 또는 'Create new' 버튼을 클릭하여 새 프로젝트를 시작합니다.
            </li>
            <li>
              <span className="font-semibold">프롬프트 작성:</span> 만들고 싶은 웹페이지의 기능과 디자인을 구체적으로 설명하는 프롬프트를 작성합니다.
            </li>
            <li>
              <span className="font-semibold">실행 및 발전:</span> 프롬프트를 실행하여 결과를 확인하고, 추가적인 대화를 통해 웹페이지를 수정하고 발전시킵니다.
            </li>
          </ol>
        </div>

        <Section 
          title="성공 사례" 
          projects={successProjects} 
          onSelectProject={handleSelectProject} 
          status={ProjectStatus.Success}
        />
        <Section 
          title="성장의 기회 (실패 사례)" 
          projects={failureProjects} 
          onSelectProject={handleSelectProject}
          status={ProjectStatus.Failure}
        />

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-md mt-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">AI Studio에서 GitHub로 웹페이지 배포하기</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">프로젝트 저장:</span> AI Studio 우측 상단의 '저장' 버튼을 눌러 프로젝트를 저장합니다.
            </li>
            <li>
              <span className="font-semibold">GitHub로 내보내기:</span> 저장 후 나타나는 'GitHub' 버튼을 클릭하여 코드를 GitHub 저장소(Repository)로 내보냅니다. 처음이라면 계정 연동이 필요합니다.
            </li>
            <li>
              <span className="font-semibold">저장소 설정 이동:</span> 생성된 GitHub 저장소 페이지에서 'Settings' 탭으로 이동합니다.
            </li>
            <li>
              <span className="font-semibold">GitHub Pages 활성화:</span> 왼쪽 메뉴에서 'Pages'를 클릭한 후, 'Source'를 'Deploy from a branch'로 설정하고 브랜치를 'main' (또는 'master')으로 선택한 뒤 'Save'를 누릅니다.
            </li>
            <li>
              <span className="font-semibold">웹페이지 확인:</span> 잠시 후 페이지 상단에 생성된 웹페이지 주소(예: `https://username.github.io/repository-name`)가 나타납니다. 링크를 클릭하여 완성된 웹페이지를 확인하세요!
            </li>
          </ol>
        </div>

      </main>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
