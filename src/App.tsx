import { Chip, ShadowBox, TextInput, TouchableIcon } from './components';
import { ColorOptions, Colors, Text } from './constants';
import './index.css';
import Search from './svgs/Search';
import { Chart } from 'react-google-charts';
import WordCloud from 'react-d3-cloud';
import { useMemo, useRef } from 'react';
import { useContainerDimensions } from './utils';

function App() {
  const rightRef = useRef(null);
  const { width: rightWidth, height } = useContainerDimensions(rightRef);

  const pieHeight = useMemo(() => rightWidth / 3, [rightWidth]);

  const data = [
    { text: 'bom', value: 1000, isPos: true },
    { text: 'horrível', value: 200, isPos: false },
    { text: 'execepcional', value: 800, isPos: true },
    { text: 'incrível', value: 1000, isPos: true },
    { text: 'insuportável', value: 1000, isPos: false },
    { text: 'chato', value: 10, isPos: false },
    { text: 'bom2', value: 1200, isPos: true },
    { text: 'horrível2', value: 220, isPos: false },
    { text: 'execepcional2', value: 820, isPos: true },
    { text: 'incrível2', value: 1200, isPos: true },
    { text: 'insuportável2', value: 1200, isPos: false },
    { text: 'chato2', value: 12, isPos: false },
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
      <div className="py-16 sm:pt-88px border-gray border-b-2 sm:w-52% md:w-40% sm:border-b-0 sm:border-r-2">
        <div className="px-16px sm:px-8px md:px-16px xl:px-48px">
          <TextInput
            icon={
              <TouchableIcon
                icon={<Search />}
                onClick={() => console.log('oiii')}
              />
            }
          />
        </div>

        <div className="px-16px py-72px md:px-16px xl:px-32px">
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
        className="h-full pt-10 sm:pt-16px sm:w-48% md:w-60% bg-green-light"
        ref={rightRef}
      >
        <div className="px-16px md:px-32px">
          <div className="text-right">
            <p className="header-text">{Text.RESULTADOS_DA_BUSCA_POR}</p>
            <p className="header-text text-green underline pb-40px">
              {'BUSCA'.toLocaleLowerCase()}
            </p>
          </div>
          <ShadowBox>
            {/* <WordCloud
              data={data}
              fill={(word: any) => (word.isPos ? Colors.GREEN : Colors.RED)}
              font="Oxygen"
              fontSize={(word) => Math.log2(word.value) * 3}
              fontWeight="bold"
              height={200}
              padding={10}
              random={Math.random}
              rotate={0}
              spiral="rectangular"
              width={rightWidth}
              // onWordClick={(event, d) => {
              //   console.log(`onWordClick: ${d.text}`);
              // }}
              // onWordMouseOver={(event, d) => {
              //   console.log(`onWordMouseOver: ${d.text}`);
              // }}
              // onWordMouseOut={(event, d) => {
              //   console.log(`onWordMouseOut: ${d.text}`);
              // }}
            /> */}
          </ShadowBox>
          <div className="mt-56px">
            <Chart
              chartType="PieChart"
              data={[
                ['Tweets', 'Quantidade'],
                ['Positivo', 5],
                ['Negativo', 5],
              ]}
              height={pieHeight}
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
}

export default App;
