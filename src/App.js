import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import ReportList from './components/ReportList';
import CreateReport from './components/CreateReport';
import SearchReport from './components/SearchReports';

const theme = deepMerge(grommet, {
  global: {
    colors: {
      primary: '#6fffb0',
      secondary: '#d6d6d6'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
});

function App() {
  return (
    <Grommet theme={theme} full background={"black"}>
      <Routes>
        <Route path='/' element={<ReportList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreateReport />} />
        <Route path='/search' element={<SearchReport />} />
      </Routes>
    </Grommet>
  );
}

export default App;
