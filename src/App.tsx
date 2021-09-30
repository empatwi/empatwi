import ShadowBox from './components/ShadowBox';
import { ColorOptions } from './constants';
import './index.css';

function App() {
  return (
    <div className="min-h-screen h-screen bg-white flex flex-col sm:flex-row">
      <div className="border-gray border-b-2 sm:w-52% sm:border-b-0 sm:border-r-2">
        Left
        <ShadowBox color={ColorOptions.GREEN}>
          <p>Child</p>
          <p>Child</p>
          <p>Child</p>
          <p>Child</p>
        </ShadowBox>
      </div>
      <div className="h-full sm:w-48% bg-green-light">
        Right
        <ShadowBox>
          <p>Child</p>
          <p>Child</p>
        </ShadowBox>
      </div>
    </div>
  );
}

export default App;
