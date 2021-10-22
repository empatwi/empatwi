/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Chip, Footer, ShadowBox, TextInput } from './components';
import {
  ColorOptions,
  Colors,
  GraphType,
  Links,
  SocialLinkOptions,
  Text,
  TrendingDataType,
  WordcloudType,
} from './constants';
import './index.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-google-charts';
import { TagCloud } from 'react-tagcloud';
import ReactLoading from 'react-loading';
import {
  parseGraphData,
  parseWordcloudData,
  sortTrendingTopics,
} from './utils';
import { Logo, Search, SocialIcon } from './svgs';
import { fetchTrendingTopics, sendSearch } from './api';

const backTrending = [
  {
    name: 'Foden',
    tweet_volume: 10959,
  },
  {
    name: 'Ludmilla',
    tweet_volume: 22175,
  },
  {
    name: 'Ludmilla',
    tweet_volume: 22175,
  },
  {
    name: '#ONE_IN_6_MILLION',
    tweet_volume: 177808,
  },
  {
    name: '#트와이스와의_매순간이_눈부셔',
    tweet_volume: 174247,
  },
  {
    name: 'Marvel',
    tweet_volume: 242603,
  },
  {
    name: 'Marvel',
    tweet_volume: 242603,
  },
  {
    name: '#OnlyIdolJungkook',
    tweet_volume: 93985,
  },
  {
    name: '6 YEARS WITH TWICE',
    tweet_volume: 97566,
  },
  {
    name: 'BILLBOARD STAR JUNGKOOK',
    tweet_volume: 95614,
  },
  {
    name: 'Cancelo',
    tweet_volume: 11715,
  },
  {
    name: 'PIRATA HOJE',
    tweet_volume: 10743,
  },
  {
    name: 'PIRATA HOJE',
    tweet_volume: 10743,
  },
  {
    name: 'PIRATA HOJE',
    tweet_volume: 10743,
  },
  {
    name: '#JENNIExChanelEvent',
    tweet_volume: 122133,
  },
  {
    name: 'COCO NEIGE',
    tweet_volume: 146151,
  },
  {
    name: 'COCO NEIGE',
    tweet_volume: 146151,
  },
  {
    name: 'COCO NEIGE',
    tweet_volume: 146151,
  },
  {
    name: 'Willow',
    tweet_volume: 14206,
  },
  {
    name: 'Eternos',
    tweet_volume: 10756,
  },
  {
    name: 'Mob Psycho',
    tweet_volume: 73396,
  },
  {
    name: 'Mob Psycho',
    tweet_volume: 73396,
  },
  {
    name: 'Mob Psycho',
    tweet_volume: 73396,
  },
  {
    name: 'Mob Psycho',
    tweet_volume: 73396,
  },
  {
    name: 'Mob Psycho',
    tweet_volume: 73396,
  },
  {
    name: 'Cowboy Bebop',
    tweet_volume: 14824,
  },
];

const dataMarvel = {
  positive: 6,
  negative: 9,
  positives_explained: [
    {
      word: 'confirmar',
      relevance: 0.1136,
    },
    {
      word: 'dar',
      relevance: 0.1072,
    },
    {
      word: 'gostar',
      relevance: 0.0617,
    },
    {
      word: 'novo',
      relevance: 0.1567,
    },
    {
      word: 'mundinho',
      relevance: 0.0618,
    },
    {
      word: 'mds',
      relevance: 0.0896,
    },
  ],
  negatives_explained: [
    {
      word: 'maior',
      relevance: -0.1692,
    },
    {
      word: 'cancelar',
      relevance: -0.1301,
    },
    {
      word: 'vida',
      relevance: -0.195,
    },
    {
      word: 'roubar',
      relevance: -0.178,
    },
    {
      word: 'lindar',
      relevance: -0.1028,
    },
    {
      word: 'tendo',
      relevance: -0.063,
    },
    {
      word: 'covid',
      relevance: -0.0797,
    },
    {
      word: 'né',
      relevance: -0.1085,
    },
    {
      word: 'entender',
      relevance: -0.266,
    },
  ],
};

const dataLudmilla = {
  positive: 2,
  negative: 4,
  positives_explained: [],
  negatives_explained: [
    {
      word: 'amo',
      relevance: -0.059,
    },
    {
      word: 'né',
      relevance: -0.1073,
    },
    {
      word: 'imaginar',
      relevance: -0.106,
    },
    {
      word: 'né',
      relevance: -0.108,
    },
    {
      word: 'né',
      relevance: -0.1075,
    },
    {
      word: 'piar',
      relevance: -0.1259,
    },
  ],
};

const Empatwi = (): JSX.Element => {
  /* =====+ useState +===== */
  const [chart, setChart] = useState<GraphType | undefined>(undefined);
  const [chartColors, setChartColors] = useState<Array<string>>();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrends, setIsLoadingTrends] = useState(true);
  const [searched, setSearched] = useState('');
  const [total, setTotal] = useState(0);
  const [trending, setTrending] = useState<TrendingDataType[] | null>(
    sortTrendingTopics(backTrending)
  );
  console.log(trending);
  const [wordcloud, setWordcloud] = useState<WordcloudType[] | null>(null);

  /* =====+ useCallback +===== */
  const handleInputChange = useCallback((event) => {
    setInput(event?.target?.value);
  }, []);

  const search = useCallback(
    (trend?: string) => {
      async function fetchData() {
        const search = trend ?? input;
        if (search) {
          setIsLoading(true);
          setSearched(search);
          // const response = await sendSearch(search);
          const response = { ...dataMarvel };
          if (response) {
            // @ts-ignore
            const { chart, colors, total } = parseGraphData(response);
            setChart(chart);
            setChartColors(colors);
            setTotal(total);
            // @ts-ignore
            setWordcloud(parseWordcloudData(response));
          }
          setIsLoading(false);
        }
      }
      if (!isLoading) fetchData();
    },
    [input, isLoading]
  );

  const handleClickSearch = useCallback((trend) => search(trend), [search]);

  const handleKeyboardSearch = useCallback(
    (event) => {
      if (event?.key === 'Enter') search();
    },
    [search]
  );

  const navigateTo = useCallback((url) => {
    window.open(url);
  }, []);

  /* =====+ useMemo +===== */
  const wordcloudTextSize = useMemo(() => {
    let max = 38;
    let min = 14;

    const { innerWidth: width } = window;

    if (width < 768) {
      max = 30;
      min = 12;
    }

    return { max, min };
  }, []);

  /* =====+ useEffect +===== */
  // State initialization
  useEffect(() => {
    async function fetchData() {
      const response = await fetchTrendingTopics();
      // @ts-ignore
      // if (response) setTrending(sortTrendingTopics(response));
    }
    fetchData();
  }, []);

  // State updates
  useEffect(() => {
    if (trending) setIsLoadingTrends(false);
  }, [trending]);

  return (
    <div className="h-screen flex flex-col justify-between font-oxygen text-white">
      {/* App */}
      <div className="sm:h-full flex flex-col text-gray bg-white sm:flex-row">
        {/* Left */}
        <div
          className="
            flex flex-col justify-between
          border-gray border-b-2
            sm:w-48% sm:border-b-0 sm:border-r-2"
        >
          {/* Content */}
          <div
            className="
            h-full flex flex-col justify-center
            px-16px lg:px-32px xl:px-48px"
          >
            {/* Header */}
            <div
              className="flex flex-col
              pt-32px sm:px-0 sm:pt-0 sm:-mt-32px lg:px-32px"
            >
              {/* Logo */}
              <div className="flex justify-center">
                <div className="w-full max-w-2xs pb-8px">
                  <Logo />
                </div>
              </div>
              {/* Input */}
              <TextInput
                handleEnter={handleKeyboardSearch}
                icon={<Button onClick={() => search()} render={<Search />} />}
                input={input}
                onChange={handleInputChange}
              />
            </div>
            {/* Trending */}
            <div className="pt-56px pb-64px sm:pt-32px sm:pb-0">
              <ShadowBox color={ColorOptions.GREEN} padding="pt-24px pb-16px">
                <p
                  className={`header-text pl-16px ${
                    isLoadingTrends ? 'pb-16px' : 'pb-48px'
                  }`}
                >
                  {Text.ASSUNTOS_DO_MOMENTO}
                </p>
                {isLoadingTrends ? (
                  <div className="flex justify-center pb-8px">
                    <ReactLoading height={56} type="spin" width={56} />
                  </div>
                ) : (
                  <div className="pl-16px">
                    {trending?.map((trend, index) => {
                      return (
                        <div
                          className={`inline-flex mr-16px mb-8px lg:mb-16px ${
                            isLoading ? 'opacity-50' : 'opacity-100'
                          }`}
                          key={index}
                        >
                          <Button
                            render={
                              <Chip
                                style={`${
                                  isLoading
                                    ? 'text-opacity-50'
                                    : 'text-opacity-100'
                                }`}
                                text={trend.name}
                              />
                            }
                            onClick={() => handleClickSearch(trend.name)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </ShadowBox>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs px-2px">
            <sup>{Text.DISCLAIMER_SYMBOL}</sup>
            {Text.DISCLAIMER_1}
          </div>
        </div>

        {/* Right */}
        <div
          className={`
            flex flex-col ${isLoading ? 'justify-center' : 'justify-evenly'}
            px-16px md:px-32px xl:px-80px sm:w-52%
          bg-green-light`}
        >
          {searched ? (
            <>
              {/* Header */}
              <div
                className={`${
                  isLoading ? 'text-center' : 'text-right'
                } pt-64px pb-32px sm:p-0`}
              >
                <p className="header-text">
                  {Text.RESULTADOS_DA_BUSCA_POR}
                  {isLoading ? Text.SPACE : null}
                  <p
                    className={`header-text truncate underline text-green ${
                      isLoading ? 'inline' : 'block'
                    }`}
                  >
                    {searched}
                  </p>
                </p>
              </div>

              {/* Bottom */}
              <div className="flex flex-col">
                {isLoading ? (
                  <div className="flex justify-center pt-24px">
                    <ReactLoading height={56} type="bubbles" width={56} />
                  </div>
                ) : (
                  <>
                    {/* Wordcloud */}
                    <div className="w-full flex justify-center">
                      <ShadowBox padding="p-0">
                        <div className="flex items-center text-center font-semibold">
                          <TagCloud
                            maxSize={wordcloudTextSize.max}
                            minSize={wordcloudTextSize.min}
                            tags={wordcloud ?? []}
                          />
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
                          // pieStartAngle: 90,
                        }}
                      />

                      {/* Legend */}
                      <div
                        className={`${
                          isLoading ? 'hidden' : 'block'
                        } text-right font-semibold`}
                      >
                        {Text.TOTAL}: {total} {Text.TWEETS_ANALISADOS}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div
              className="
                flex flex-col
                text-md font-medium text-center"
            >
              <p className="text-2xl font-semibold pb-32px">{Text.WELCOME}</p>
              <p className="text-left pb-16px">
                {Text.TIP_1}
                <sup>{Text.DISCLAIMER_SYMBOL}</sup>
              </p>
              <p className="text-left">{Text.TIP_2}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer
        leftItems={<p className="text-base">{Text.EMPATWI_2021}</p>}
        rightItems={
          <div className="flex">
            <div className="flex pr-24px">
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
