
import React, { useState, useEffect } from 'react';

type View = 'login' | 'quiz' | 'student_result' | 'admin_login' | 'admin_view';

interface Answer {
  question: string;
  answer: string;
}

interface Submission {
  name: string;
  answers: Answer[];
  date: string;
}

const quizQuestions = [
    { id: 1, question: "복도에서 선생님을 만나면 어떻게 해야 할까요?" },
    { id: 2, question: "수업 시간에 질문이 있을 때 올바른 행동은 무엇일까요?" },
    { id: 3, question: "친구의 물건을 빌리고 싶을 때 어떻게 말해야 할까요?" },
];

const TEACHER_PASSWORD = "teacher123";

const EtiquetteQuizApp: React.FC = () => {
    const [view, setView] = useState<View>('login');
    const [userName, setUserName] = useState('');
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>(quizQuestions.map(q => ({ question: q.question, answer: '' })));
    const [submissions, setSubmissions] = useState<Submission[]>(() => {
        try {
            const saved = localStorage.getItem('quizSubmissions');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        localStorage.setItem('quizSubmissions', JSON.stringify(submissions));
    }, [submissions]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if(userName.trim()){
            setView('quiz');
            setError('');
        } else {
            setError('이름을 입력해주세요.');
        }
    };
    
    const handleSubmitQuiz = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentAnswers.some(a => !a.answer.trim())) {
            setError('모든 문항에 답변해주세요.');
            return;
        }
        const newSubmission: Submission = {
            name: userName,
            answers: currentAnswers,
            date: new Date().toLocaleString(),
        };
        setSubmissions([...submissions, newSubmission]);
        setView('student_result');
        setError('');
    };
    
    const handleLogout = () => {
        setUserName('');
        setCurrentAnswers(quizQuestions.map(q => ({ question: q.question, answer: '' })));
        setView('login');
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if(adminPassword === TEACHER_PASSWORD) {
            setView('admin_view');
            setError('');
            setAdminPassword('');
        } else {
            setError('비밀번호가 틀렸습니다.');
        }
    };

    const renderView = () => {
        switch(view){
            case 'login':
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">예의 범절 설문</h3>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="이름을 입력하세요" className="w-full p-2 border rounded" />
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">시작하기</button>
                        </form>
                        <button onClick={() => setView('admin_login')} className="mt-4 text-sm text-gray-600 hover:underline">선생님이신가요?</button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                );
            case 'quiz':
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4">{userName}님, 환영합니다!</h3>
                        <form onSubmit={handleSubmitQuiz} className="space-y-4">
                            {quizQuestions.map((q, index) => (
                                <div key={q.id}>
                                    <label className="block font-medium">{q.question}</label>
                                    <textarea 
                                        value={currentAnswers[index].answer}
                                        onChange={e => {
                                            const newAnswers = [...currentAnswers];
                                            newAnswers[index].answer = e.target.value;
                                            setCurrentAnswers(newAnswers);
                                        }}
                                        rows={2}
                                        className="w-full p-2 border rounded mt-1"
                                    />
                                </div>
                            ))}
                             <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">제출하기</button>
                             {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                );
            case 'student_result':
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">제출이 완료되었습니다.</h3>
                        <p>수고하셨습니다, {userName}님.</p>
                        <button onClick={handleLogout} className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600">로그아웃</button>
                    </div>
                );
            case 'admin_login':
                 return (
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">선생님 로그인</h3>
                        <form onSubmit={handleAdminLogin} className="space-y-4">
                            <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="비밀번호를 입력하세요" className="w-full p-2 border rounded" />
                            <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">확인</button>
                        </form>
                        <button onClick={() => setView('login')} className="mt-4 text-sm text-gray-600 hover:underline">학생으로 돌아가기</button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                );
            case 'admin_view':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="text-xl font-bold">학생 제출 결과</h3>
                           <button onClick={() => setView('login')} className="bg-gray-500 text-white p-2 rounded text-sm hover:bg-gray-600">로그아웃</button>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {submissions.length > 0 ? submissions.map((sub, index) => (
                                <div key={index} className="p-4 border rounded bg-gray-50">
                                    <p className="font-bold">{sub.name} <span className="text-sm font-normal text-gray-500">({sub.date})</span></p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        {sub.answers.map((a, i) => <li key={i}><strong>Q:</strong> {a.question} <br/><span className="pl-4"><strong>A:</strong> {a.answer}</span></li>)}
                                    </ul>
                                </div>
                            )) : <p>아직 제출된 결과가 없습니다.</p>}
                        </div>
                    </div>
                );
        }
    }

    return (
         <div className="p-4 bg-gray-50 rounded-lg">
            <div className="mb-4 p-4 border border-red-300 bg-red-50 rounded-md text-red-700">
                <strong>데모 안내:</strong> 이 데이터는 브라우저의 `localStorage`에 저장됩니다. 오직 이 브라우저/기기에서 제출된 내용만 선생님 화면에서 볼 수 있습니다.
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
                {renderView()}
            </div>
        </div>
    );
};

export default EtiquetteQuizApp;
