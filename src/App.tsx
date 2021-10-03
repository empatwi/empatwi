import { Chip, ShadowBox, TextInput, TouchableIcon } from './components';
import { ColorOptions, Colors, Text } from './constants';
import './index.css';
import Search from './svgs/Search';
import { Chart } from 'react-google-charts';
import { useRef } from 'react';
import { TagCloud } from 'react-tagcloud';

const App = () => {
  const rightRef = useRef(null);

  const data = [
    { value: 'bom', count: 40, color: Colors.GREEN },
    { value: 'horrível', count: 30, color: Colors.RED },
    { value: 'insuportável', count: 28, color: Colors.RED },
    { value: 'chato', count: 35, color: Colors.RED },
    { value: 'incrível', count: 33, color: Colors.GREEN },
    { value: 'perfeito', count: 50, color: Colors.GREEN },
    { value: 'excepcional', count: 30, color: Colors.GREEN },
  ];

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
        <div className="px-16px xl:px-48px">
          <TextInput
            icon={
              <TouchableIcon
                icon={<Search />}
                onClick={() => console.log('oiii')}
              />
            }
          />
        </div>

        <div className="px-16px pt-72px xl:px-32px">
          <ShadowBox color={ColorOptions.GREEN} paddingX paddingY>
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
      <div
        className="h-full pt-10 sm:pt-16px sm:w-48% bg-green-light"
        ref={rightRef}
      >
        <div className="px-16px md:px-32px">
          <div className="text-right">
            <p className="header-text">{Text.RESULTADOS_DA_BUSCA_POR}</p>
            <p className="header-text text-green underline pb-40px">
              {'BUSCA'.toLocaleLowerCase()}
            </p>
          </div>

          {/* Wordcloud */}
          <ShadowBox paddingX paddingY>
            <div className="flex justify-center text-center font-semibold">
              <TagCloud
                maxSize={40}
                minSize={18}
                onClick={(tag: { value: string }) =>
                  alert(`'${tag.value}' was selected!`)
                }
                tags={data}
              />
            </div>
          </ShadowBox>

          {/* Graph */}
          <div className="flex justify-center mt-56px mb-40px sm:mb-0">
            <Chart
              chartType="PieChart"
              data={[
                ['Tweets', 'Quantidade'],
                ['Positivo', 7],
                ['Negativo', 2],
              ]}
              height="100%"
              loader={
                <div className="flex justify-center text-white">
                  Carregando...
                </div>
              }
              options={{
                backgroundColor: Colors.GREEN_LIGHT,
                chartArea: { height: '95%', left: 0, width: '100%' },
                colors: [Colors.GREEN, Colors.RED],
                legend: 'none',
                pieHole: 0.4,
                pieSliceTextStyle: {
                  color: '#FFFFFF',
                  fontName: 'Oxygen',
                  fontSize: 16,
                },
              }}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
