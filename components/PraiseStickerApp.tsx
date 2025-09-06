
import React, { useState, useEffect, useMemo } from 'react';
import TrophyIcon from './icons/TrophyIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface Student {
  id: number;
  name: string;
  stickers: number;
}

interface Class {
  id: number;
  name:string;
  students: Student[];
}

const initialData: Class[] = [
    { id: 1, name: '1반', students: [{id: 101, name: '김민준', stickers: 5}, {id: 102, name: '이서연', stickers: 8}] },
    { id: 2, name: '2반', students: [{id: 201, name: '박도윤', stickers: 10}, {id: 202, name: '최아윤', stickers: 3}] }
];

const PraiseStickerApp: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>(() => {
        try {
            const savedData = localStorage.getItem('praiseStickerData');
            return savedData ? JSON.parse(savedData) : initialData;
        } catch (error) {
            return initialData;
        }
    });

    const [selectedClassId, setSelectedClassId] = useState<number>(1);
    const [selectedStudentId, setSelectedStudentId] = useState<number>(101);
    const [memo, setMemo] = useState('');

    useEffect(() => {
        localStorage.setItem('praiseStickerData', JSON.stringify(classes));
    }, [classes]);

    const handleStickerChange = (amount: number) => {
        if (!memo.trim()) {
            alert('메모를 작성해주세요.');
            return;
        }
        setClasses(prevClasses => {
            return prevClasses.map(c => {
                if (c.id === selectedClassId) {
                    return {
                        ...c,
                        students: c.students.map(s => {
                            if (s.id === selectedStudentId) {
                                return {...s, stickers: Math.max(0, s.stickers + amount) };
                            }
                            return s;
                        })
                    }
                }
                return c;
            })
        });
        console.log(`기록: [${new Date().toLocaleString()}] ${classes.find(c=>c.id === selectedClassId)?.name} ${classes.find(c=>c.id === selectedClassId)?.students.find(s=>s.id === selectedStudentId)?.name} 학생에게 ${amount > 0 ? '+1' : '-1'}. 이유: ${memo}`);
        setMemo('');
    };

    const { winningClass, winningStudent } = useMemo(() => {
        let maxStickers = -1;
        let winningStudent: Student | null = null;
        let classTotals: { [key: number]: number } = {};

        classes.forEach(c => {
            let total = 0;
            c.students.forEach(s => {
                total += s.stickers;
                if (s.stickers > maxStickers) {
                    maxStickers = s.stickers;
                    winningStudent = s;
                }
            });
            classTotals[c.id] = total;
        });
        
        const winningClassId = Object.keys(classTotals).reduce((a, b) => classTotals[parseInt(a)] > classTotals[parseInt(b)] ? a : b);
        const winningClass = classes.find(c => c.id === parseInt(winningClassId)) || null;

        return { winningClass, winningStudent };

    }, [classes]);


    return (
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="mb-4 p-4 border border-red-300 bg-red-50 rounded-md text-red-700">
                <strong>데모 안내:</strong> 이 데이터는 브라우저의 `localStorage`에 저장됩니다. 다른 컴퓨터나 브라우저에서는 데이터가 공유되지 않으며, 캐시를 지우면 사라집니다. 이것이 이 프로젝트의 '실패' 지점입니다.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Controls */}
                <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-4">스티커 관리</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">반 선택</label>
                            <select value={selectedClassId} onChange={e => {
                                const newClassId = Number(e.target.value);
                                setSelectedClassId(newClassId);
                                const firstStudentId = classes.find(c => c.id === newClassId)?.students[0]?.id || 0;
                                setSelectedStudentId(firstStudentId);
                            }} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">학생 선택</label>
                            <select value={selectedStudentId} onChange={e => setSelectedStudentId(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                {classes.find(c => c.id === selectedClassId)?.students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">메모</label>
                            <textarea value={memo} onChange={e => setMemo(e.target.value)} rows={3} className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2" placeholder="칭찬 또는 개선점 기록..."></textarea>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => handleStickerChange(1)} className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"><PlusIcon/>추가</button>
                            <button onClick={() => handleStickerChange(-1)} className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"><MinusIcon/>차감</button>
                        </div>
                    </div>
                     <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                        <h4 className="font-bold flex items-center"><TrophyIcon/> 현재 1등</h4>
                        <p><strong>최고의 반:</strong> {winningClass?.name || 'N/A'}</p>
                        <p><strong>최고의 학생:</strong> {winningStudent?.name || 'N/A'} ({winningStudent?.stickers}개)</p>
                    </div>
                </div>

                {/* Display */}
                <div className="md:col-span-2 space-y-4">
                    {classes.map(c => (
                        <div key={c.id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-bold text-lg text-indigo-700 mb-2">{c.name} 현황</h3>
                            <ul className="space-y-2">
                                {c.students.map(s => (
                                    <li key={s.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="font-medium">{s.name}</span>
                                        <span className="font-bold text-xl text-indigo-600">{s.stickers}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PraiseStickerApp;
