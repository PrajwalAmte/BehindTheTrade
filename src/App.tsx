import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { SimulationPage } from './components/SimulationPage';
import { LearnPage } from './components/LearnPage';
import { ReferencesPage } from './components/ReferencesPage';

type Page = 'home' | 'simulation' | 'learn' | 'references';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'simulation' && <SimulationPage onNavigate={handleNavigate} />}
      {currentPage === 'learn' && <LearnPage onNavigate={handleNavigate} />}
      {currentPage === 'references' && <ReferencesPage onNavigate={handleNavigate} />}
    </>
  );
}

export default App;
