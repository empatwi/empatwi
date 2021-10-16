import { Button, Chip, Footer, ShadowBox, TextInput } from './components';
import {
  ColorOptions,
  Colors,
  Links,
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
import { parseWordcloudData, sortTrendingTopics } from './utils';
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
    const { total, cloud } = parseWordcloudData(backData);
    setTotal(total);
    setWordcloud(cloud);
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
        <div className="flex flex-col justify-center border-gray border-b-2 sm:w-48% sm:border-b-0 sm:border-r-2">
          {/* Header */}
          <div className="flex flex-col px-16px pt-32px sm:pt-0 xl:px-64px">
            <div className="flex justify-center">
              <div className="w-full max-w-xs pb-8px">
                <Logo />
              </div>
            </div>
            <TextInput
              handleEnter={handleKeyboardSearch}
              icon={<Button onClick={() => sendSearch()} render={<Search />} />}
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
              {/* Legend */}
              <div className="flex flex-row-reverse font-semibold">
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
