import {
  Chip,
  Footer,
  ShadowBox,
  TextInput,
  TouchableIcon,
} from './components';
import {
  ColorOptions,
  Colors,
  SocialLinkOptions,
  Text,
  WordcloudType,
} from './constants';
import './index.css';
import Search from './svgs/Search';
import { Chart } from 'react-google-charts';
import { useCallback, useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Logo from './svgs/Logo';
import { parseWordcloudData } from './utils';
import { SocialIcon } from './svgs';

const backData = {
  positive: 4,
  negative: 1,
  positives_explained: [
    {
      word: 'ainda',
      relevance: 0.19,
    },
    {
      word: 'merecer',
      relevance: 0.12,
    },
    {
      word: 'ano',
      relevance: 0.12,
    },
    {
      word: 'ainda',
      relevance: 0.23,
    },
    {
      word: 'merecer',
      relevance: 0.67,
    },
    {
      word: 'ano',
      relevance: 0.55,
    },
  ],
  negatives_explained: [
    {
      word: 'horrível',
      relevance: -0.08,
    },
    {
      word: 'horrível',
      relevance: -0.03,
    },
    {
      word: 'horrível',
      relevance: -0.7,
    },
    {
      word: 'me faz mal',
      relevance: -0.3,
    },
    {
      word: 'desgosto',
      relevance: -0.45,
    },
    {
      word: 'bonito',
      relevance: -0.01,
    },
  ],
};

const Empatwi = (): JSX.Element => {
  const [input, setInput] = useState('');
  const [total, setTotal] = useState(0);
  const [trending, setTrending] = useState([
    'Lorem ipsum',
    'dolor sit amet',
    'consectetur',
    'elit',
    'Donec vitae eros at erat',
    'rutrum finibus',
    'tempus eget',
    'Maecenas eu ullamcorper metus',
  ]);
  const [wordcloud, setWordcloud] = useState<WordcloudType[] | null>();

  useEffect(() => {
    const { total, cloud } = parseWordcloudData(backData);
    setTotal(total);
    setWordcloud(cloud);
  }, []);

  const handleInputChange = useCallback((event) => {
    setInput(event?.target?.value);
  }, []);

  const sendSearch = useCallback(() => {
    // Call API search
    if (input) console.log('SEARCH:', input);
  }, [input]);

  const handleSearch = useCallback(
    (event) => {
      if (event?.key === 'Enter') sendSearch();
    },
    [sendSearch]
  );

  return (
    <div className="h-screen flex flex-col justify-between font-oxygen text-white">
      {/* App */}
      <div className="sm:h-full flex flex-col text-gray bg-white sm:flex-row">
        {/* Left */}
        <div className="flex flex-col justify-center border-gray border-b-2 sm:w-48% sm:border-b-0 sm:border-r-2">
          {/* Header */}
          <div className="flex flex-col px-16px pt-32px sm:pt-0 xl:px-64px">
            <div className="flex justify-center">
              <div className="w-full max-w-xs pb-8px">
                <Logo />
              </div>
            </div>
            <TextInput
              handleEnter={handleSearch}
              icon={<TouchableIcon icon={<Search />} onClick={sendSearch} />}
              input={input}
              onChange={handleInputChange}
            />
          </div>

          {/* Trending */}
          <div className="px-16px pt-56px pb-64px sm:pt-32px sm:pb-0 xl:px-32px">
            <ShadowBox
              color={ColorOptions.GREEN}
              padding="pl-16px pt-24px pb-16px"
            >
              <p className="header-text pb-48px">{Text.ASSUNTOS_DO_MOMENTO}</p>
              {trending.map((trend, index) => {
                return (
                  <div
                    className="inline-flex mr-16px mb-8px md:mb-16px"
                    key={index}
                  >
                    <Chip text={trend} />
                  </div>
                );
              })}
            </ShadowBox>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-evenly px-16px md:px-32px sm:w-52% bg-green-light">
          {/* Header */}
          <div className="text-right pt-64px pb-32px sm:p-0">
            <p className="header-text">{Text.RESULTADOS_DA_BUSCA_POR}</p>
            <p className="header-text text-green underline">
              {'BUSCA'.toLocaleLowerCase()}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex flex-col">
            {/* Wordcloud */}
            <div className="w-full flex justify-center">
              <div className="max-w-lg">
                <ShadowBox padding="p-0">
                  <div className="flex items-center text-center font-semibold sm:h-30vh">
                    <TagCloud
                      maxSize={32}
                      minSize={12}
                      tags={wordcloud ?? []}
                    />
                  </div>
                </ShadowBox>
              </div>
            </div>

            {/* Graph */}
            <div className="flex flex-col justify-center mt-32px mb-56px sm:mt-16px sm:mb-0">
              <Chart
                chartType="PieChart"
                data={[
                  ['Tweets', 'Quantidade'],
                  ['Positivo', 7],
                  ['Negativo', 2],
                ]}
                height="35vh"
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
              />
              <p className="text-right font-semibold">
                {Text.TOTAL}: {total} {Text.TWEETS_ANALISADOS}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer
        leftItems={<p className="text-lg">{Text.EMPATWI_2021}</p>}
        rightItems={
          <div className="flex">
            <div className="mr-24px">
              <SocialIcon link={SocialLinkOptions.TWITTER} />
            </div>
            <SocialIcon link={SocialLinkOptions.GITHUB} />
          </div>
        }
      />
    </div>
  );
};

export default Empatwi;
