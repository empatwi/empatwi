import ShadowBox from './components/ShadowBox';
import { ColorOptions, Text } from './constants';
import './index.css';

function App() {
  return (
    <div className="min-h-screen h-screen font-oxygen bg-white flex flex-col sm:flex-row">
      {/* Left */}
      <div className="py-16 sm:pt-88px border-gray border-b-2 sm:w-52% sm:border-b-0 sm:border-r-2">
        <div className="px-4 sm:px-56px">
          <ShadowBox color={ColorOptions.GREEN}>
            <p className="header-text pb-48px">{Text.ASSUNTOS_DO_MOMENTO}</p>
            <p>Topics</p>
          </ShadowBox>
        </div>
      </div>
      {/* Right */}
      <div className="h-full pt-10 sm:pt-72px sm:w-48% bg-green-light">
        <div className="px-4 sm:px-32px">
          <div className="text-right">
            <p className="header-text">{Text.RESULTADOS_DA_BUSCA_POR}</p>
            <p className="header-text text-green underline pb-40px">
              {'BUSCA'.toLocaleLowerCase()}
            </p>
          </div>
          <ShadowBox>
            <p>Child</p>
            <p>Child</p>
          </ShadowBox>
        </div>
      </div>
    </div>
  );
}

export default App;
