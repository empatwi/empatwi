import { Chip, ShadowBox, TextInput, TouchableIcon } from './components';
import { ColorOptions, Colors, Text } from './constants';
import './index.css';
import Search from './svgs/Search';
import { Chart } from 'react-google-charts';
import { useCallback, useRef, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Logo from './svgs/Logo';

const Empatwi = (): JSX.Element => {
  const [input, setInput] = useState('');

  const rightRef = useRef(null);

  const sendSearch = useCallback(() => {
    // Call API search
    if (input) console.log('SEARCH:', input);
  }, [input]);

  const handleChange = useCallback((event) => {
    setInput(event?.target?.value);
  }, []);

  const handleSearch = useCallback(
    (event) => {
      if (event?.key === 'Enter') {
        sendSearch();
      }
    },
    [sendSearch]
  );

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
    <div className="min-h-screen h-screen flex flex-col font-oxygen text-gray bg-white sm:flex-row">
      {/* Left */}
      <div className="py-16 sm:pt-48px border-gray border-b-2 sm:w-48% sm:border-b-0 sm:border-r-2">
        {/* Header */}
        <div className="flex flex-col px-16px xl:px-48px">
          <div className="flex justify-center">
            <div className="w-full max-w-xs pb-8px">
              <Logo />
            </div>
          </div>
          <TextInput
            handleEnter={handleSearch}
            icon={<TouchableIcon icon={<Search />} onClick={sendSearch} />}
            input={input}
            onChange={handleChange}
          />
        </div>

        {/* Trending */}
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
        className="px-16px pt-16 sm:pt-32px md:px-32px sm:w-52% bg-green-light"
        ref={rightRef}
      >
        {/* Header */}
        <div className="text-right ">
          <p className="header-text">{Text.RESULTADOS_DA_BUSCA_POR}</p>
          <p className="header-text text-green underline pb-40px">
            {'BUSCA'.toLocaleLowerCase()}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col">
          {/* Wordcloud */}
          <div className="w-full flex justify-center">
            <div className="max-w-md">
              <ShadowBox paddingX paddingY>
                <div className="flex justify-center text-center font-semibold">
                  <TagCloud maxSize={40} minSize={18} tags={data} />
                </div>
              </ShadowBox>
            </div>
          </div>

          {/* Graph */}
          <div className="flex flex-col justify-center mb-40px sm:mb-0">
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
                // backgroundColor: Colors.GREEN_LIGHT,
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
              // width="100%"
            />
            <p className="mt-8px text-right font-semibold">
              {Text.TOTAL}: {23} {Text.TWEETS_ANALISADOS}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empatwi;
