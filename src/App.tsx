import { useState } from 'react';
import { DepartmentSelector } from './components/DepartmentSelector';
import { ChatInterface } from './components/ChatInterface';
import { GraduationCap } from 'lucide-react';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {!selectedDepartment ? (
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                  <GraduationCap className="w-7 h-7 text-white transform rotate-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    LearningisLife AI
                  </h1>
                  <p className="text-sm text-gray-600">Your Personal Study Assistant</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Welcome to Your Learning Journey! 🎓
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get instant help with homework, prepare for exams, understand complex topics,
                  and explore new concepts across all your subjects. Learning has never been this easy!
                </p>
              </div>

              <DepartmentSelector
                selectedDepartment={selectedDepartment}
                onSelectDepartment={setSelectedDepartment}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Instant Answers</h3>
                <p className="text-gray-600 text-sm">
                  Get quick, accurate answers to your questions across all subjects
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Study Smarter</h3>
                <p className="text-gray-600 text-sm">
                  Break down complex topics into easy-to-understand explanations
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Exam Ready</h3>
                <p className="text-gray-600 text-sm">
                  Prepare effectively with practice questions and exam tips
                </p>
              </div>
            </div>
          </main>

          <footer className="bg-white border-t border-gray-200 py-6">
            <p className="text-center text-gray-600 text-sm">
              © 2025 LearningisLife AI - Empowering Students to Excel
            </p>
          </footer>
        </div>
      ) : (
        <div className="h-screen flex flex-col">
          <ChatInterface
            departmentId={selectedDepartment}
            onBack={() => setSelectedDepartment(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
