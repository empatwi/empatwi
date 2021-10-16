import { Button, Chip, Footer, ShadowBox, TextInput } from './components';
import {
  ColorOptions,
  Colors,
  GraphType,
  Links,
  SocialLinkOptions,
  Text,
  WordcloudType,
} from './constants';
import './index.css';
import { Chart } from 'react-google-charts';
import { useCallback, useEffect, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import {
  parseGraphData,
  parseWordcloudData,
  sortTrendingTopics,
} from './utils';
import { Logo, Search, SocialIcon } from './svgs';

const backData = {
  positive: 46,
  negative: 15,
  positives_explained: [
    {
      word: 'vir',
      relevance: 0.1184,
    },
    {
      word: 'melhor',
      relevance: 0.078,
    },
    {
      word: 'vir',
      relevance: 0.1283,
    },
    {
      word: 'flamengo',
      relevance: 0.1132,
    },
    {
      word: 'meter',
      relevance: 0.0579,
    },
    {
      word: 'flamengo',
      relevance: 0.1162,
    },
    {
      word: 'linda',
      relevance: 0.0628,
    },
    {
      word: 'cabelo',
      relevance: 0.1163,
    },
    {
      word: 'chamar',
      relevance: 0.0915,
    },
    {
      word: 'picoliportal',
      relevance: 0,
    },
    {
      word: 'sábado',
      relevance: 0.0618,
    },
    {
      word: 'peito',
      relevance: 0.0619,
    },
    {
      word: 'ano',
      relevance: 0.1158,
    },
    {
      word: 'bom',
      relevance: 0.2389,
    },
    {
      word: 'limão',
      relevance: 0.1104,
    },
    {
      word: 'fazer',
      relevance: 0.0734,
    },
    {
      word: 'bom',
      relevance: 0.2097,
    },
    {
      word: 'bom',
      relevance: 0.2297,
    },
    {
      word: 'feliz',
      relevance: 0.1533,
    },
    {
      word: 'fla',
      relevance: 0,
    },
    {
      word: 'bom',
      relevance: 0.2075,
    },
    {
      word: 'bom',
      relevance: 0.2394,
    },
    {
      word: 'caaaaaro',
      relevance: 0,
    },
    {
      word: 'flamengo',
      relevance: 0.1132,
    },
    {
      word: 'responder',
      relevance: 0.0466,
    },
    {
      word: 'chegar',
      relevance: 0.1609,
    },
    {
      word: 'merecer',
      relevance: 0.1173,
    },
    {
      word: 'zerou',
      relevance: 0,
    },
    {
      word: 'camisa',
      relevance: 0.0864,
    },
    {
      word: 'ano',
      relevance: 0.1091,
    },
    {
      word: 'deus',
      relevance: 0.1301,
    },
  ],
  negatives_explained: [
    {
      word: 'bola',
      relevance: -0.1345,
    },
    {
      word: 'dever',
      relevance: -0.1443,
    },
    {
      word: 'começar',
      relevance: -0.063,
    },
    {
      word: 'ler',
      relevance: -0.0797,
    },
    {
      word: 'dia',
      relevance: -0.2401,
    },
    {
      word: 'acabar',
      relevance: -0.1065,
    },
    {
      word: 'dia',
      relevance: -0.2529,
    },
    {
      word: 'continuar',
      relevance: -0.1068,
    },
    {
      word: 'vencer',
      relevance: -0.0762,
    },
    {
      word: 'quantos',
      relevance: -0.0797,
    },
    {
      word: 'cima',
      relevance: -0.0797,
    },
    {
      word: 'começar',
      relevance: -0.0636,
    },
    {
      word: 'mundo',
      relevance: -0.151,
    },
    {
      word: 'insta',
      relevance: -0.0769,
    },
    {
      word: 'amiga',
      relevance: -0.079,
    },
    {
      word: 'dia',
      relevance: -0.2358,
    },
    {
      word: 'parar',
      relevance: -0.0636,
    },
    {
      word: 'querer',
      relevance: -0.149,
    },
    {
      word: 'ninguém',
      relevance: -0.0786,
    },
  ],
};

const Empatwi = (): JSX.Element => {
  const [input, setInput] = useState('');
  const [chart, setChart] = useState<GraphType | undefined>(undefined);
  const [chartColors, setChartColors] = useState<Array<string>>();
  const [total, setTotal] = useState(0);
  const [trending] = useState(
    sortTrendingTopics([
      {
        name: 'Glória Groove',
        tweet_volume: 22169,
      },
      {
        name: 'My Name',
        tweet_volume: 140721,
      },
      {
        name: 'Perdão',
        tweet_volume: 16830,
      },
      {
        name: 'Faking Love',
        tweet_volume: 86308,
      },
      {
        name: 'Coldplay',
        tweet_volume: 155419,
      },
      {
        name: 'tira férias juliette',
        tweet_volume: 19757,
      },
      {
        name: 'turnê i&r eua',
        tweet_volume: 28871,
      },
      {
        name: 'seokjin',
        tweet_volume: 247111,
      },
      {
        name: 'In The Soop',
        tweet_volume: 660663,
      },
      {
        name: 'Nintendo',
        tweet_volume: 275932,
      },
      {
        name: 'Leeds',
        tweet_volume: 14672,
      },
    ])
  );
  const [wordcloud, setWordcloud] = useState<WordcloudType[] | null>();

  useEffect(() => {
    const { chart, colors, total } = parseGraphData(backData);
    setChart(chart);
    setChartColors(colors);
    setTotal(total);
    setWordcloud(parseWordcloudData(backData));
  }, []);

  const handleInputChange = useCallback((event) => {
    setInput(event?.target?.value);
  }, []);

  const sendSearch = useCallback(
    (trend?: string) => {
      console.log(trend ?? input);
    },
    [input]
  );

  const handleClickSearch = useCallback(
    (trend) => sendSearch(trend),
    [sendSearch]
  );

  const handleKeyboardSearch = useCallback(
    (event) => {
      if (event?.key === 'Enter') sendSearch();
    },
    [sendSearch]
  );

  const navigateTo = useCallback((url) => {
    window.open(url);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between font-oxygen text-white">
      {/* App */}
      <div className="sm:h-full flex flex-col text-gray bg-white sm:flex-row">
        {/* Left */}
        <div
          className="
            flex flex-col justify-center
            px-16px lg:px-32px xl:px-48px
          border-gray border-b-2
            sm:w-48% sm:border-b-0 sm:border-r-2"
        >
          {/* Header */}
          <div
            className="flex flex-col
              pt-32px sm:px-0 sm:pt-0 sm:-mt-32px lg:px-32px"
          >
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs pb-8px">
                <Logo />
              </div>
            </div>
            {/* Input */}
            <TextInput
              handleEnter={handleKeyboardSearch}
              icon={<Button onClick={() => sendSearch()} render={<Search />} />}
              input={input}
              onChange={handleInputChange}
            />
          </div>

          {/* Trending */}
          <div className="pt-56px pb-64px sm:pt-32px sm:pb-0">
            <ShadowBox
              color={ColorOptions.GREEN}
              padding="pl-16px pt-24px pb-16px"
            >
              <p className="header-text pb-48px">{Text.ASSUNTOS_DO_MOMENTO}</p>
              {trending.map((trend, index) => {
                return (
                  <div
                    className="inline-flex mr-16px mb-8px lg:mb-16px"
                    key={index}
                  >
                    <Button
                      render={<Chip text={trend.name} />}
                      onClick={() => handleClickSearch(trend.name)}
                    />
                  </div>
                );
              })}
            </ShadowBox>
          </div>
        </div>

        {/* Right */}
        <div
          className="
            flex flex-col justify-evenly
            px-16px md:px-32px xl:px-80px sm:w-52%
          bg-green-light"
        >
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
              <ShadowBox padding="p-0">
                <div className="flex items-center text-center font-semibold sm:h-30vh">
                  <TagCloud maxSize={32} minSize={12} tags={wordcloud ?? []} />
                </div>
              </ShadowBox>
            </div>

            {/* Graph */}
            <div className="flex flex-col mt-32px mb-56px sm:mt-16px sm:mb-0">
              <Chart
                chartType="PieChart"
                data={chart}
                height="35vh"
                loader={
                  <div className="flex justify-center text-white">
                    {Text.CARREGANDO}
                  </div>
                }
                options={{
                  backgroundColor: Colors.GREEN_LIGHT,
                  chartArea: { height: '95%', left: 0, width: '100%' },
                  colors: chartColors,
                  legend: 'none',
                  pieHole: 0.4,
                  pieSliceTextStyle: {
                    color: '#FFFFFF',
                    fontName: 'Oxygen',
                    fontSize: 16,
                  },
                  pieStartAngle: 90,
                }}
              />

              {/* Legend */}
              <div className="text-right font-semibold">
                {Text.TOTAL}: {total} {Text.TWEETS_ANALISADOS}
              </div>
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
              <Button
                onClick={() => navigateTo(Links.TWITTER)}
                render={<SocialIcon link={SocialLinkOptions.TWITTER} />}
              />
            </div>
            <Button
              onClick={() => navigateTo(Links.GITHUB)}
              render={<SocialIcon link={SocialLinkOptions.GITHUB} />}
            />
          </div>
        }
      />
    </div>
  );
};

export default Empatwi;
