import { Chip, ShadowBox, TextInput, TouchableIcon } from './components';
import { ColorOptions, Text } from './constants';
import './index.css';
import Search from './svgs/Search';

function App() {
  const mockChips = [
    'Lorem ipsum',
    'dolor sit amet',
    'consectetur',
    'elit',
    'Donec vitae eros at erat',
    'rutrum finibus',
    'tempus eget',
    'Maecenas eu ullamcorper metus',
  ];

  return (
    <div className="min-h-screen h-screen font-oxygen bg-white flex flex-col sm:flex-row">
      {/* Left */}
      <div className="py-16 sm:pt-88px border-gray border-b-2 sm:w-52% sm:border-b-0 sm:border-r-2">
        <div className="px-16px md:px-88px">
          <TextInput
            icon={
              <TouchableIcon
                icon={<Search />}
                onClick={() => console.log('oiii')}
              />
            }
          />
        </div>

        <div className="px-16px py-72px md:px-56px md:py-88px">
          <ShadowBox color={ColorOptions.GREEN}>
            <p className="header-text pb-48px">{Text.ASSUNTOS_DO_MOMENTO}</p>
            {mockChips.map((chip, index) => {
              return (
                <div
                  className="inline-flex mr-16px mb-8px md:mb-16px"
                  key={index}
                >
                  <Chip text={`${chip}${index}`} />
                </div>
              );
            })}
          </ShadowBox>
        </div>
      </div>

      {/* Right */}
      <div className="h-full pt-10 sm:pt-72px sm:w-48% bg-green-light">
        <div className="px-16px md:px-32px">
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
