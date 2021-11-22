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

const Empatwi = (): JSX.Element => {
  /* =====+ useState +===== */
  const [chart, setChart] = useState<GraphType | undefined>(undefined);
  const [chartColors, setChartColors] = useState<Array<string>>();
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrends, setIsLoadingTrends] = useState(true);
  const [searched, setSearched] = useState('');
  const [total, setTotal] = useState(0);
  const [trending, setTrending] = useState<TrendingDataType[] | null>(null);
  const [wordcloud, setWordcloud] = useState<WordcloudType[] | null>(null);

  /* =====+ useCallback +===== */
  const handleInputChange = useCallback((event) => {
    setInput(event?.target?.value);
  }, []);

  const resetError = useCallback(() => setError(''), []);

  const search = useCallback(
    (trend?: string) => {
      async function fetchData() {
        const search = trend ?? input;
        if (search) {
          setIsLoading(true);
          setSearched(search);

          resetError();
          const response = await sendSearch(search);

          if (response) {
            // @ts-ignore
            const { chart, colors, total } = parseGraphData(response);
            // @ts-ignore
            setWordcloud(parseWordcloudData(response));
            setChart(chart);
            setChartColors(colors);
            setTotal(total);
            setIsLoading(false);
          } else setError(Text.ERROR_RESULTS);
        }
      }
      if (!isLoading || (isLoading && error)) fetchData();
    },
    [error, input, isLoading, resetError]
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
      resetError();
      const response = await fetchTrendingTopics();
      // @ts-ignore
      if (response) setTrending(sortTrendingTopics(response));
      else setError(Text.ERROR_TRENDS);
    }
    fetchData();
  }, [resetError]);

  // State updates
  useEffect(() => {
    if (trending) setIsLoadingTrends(false);
  }, [trending]);

  return (
    <div className="flex flex-col justify-between h-screen text-white font-oxygen">
      {/* App */}
      <div className="flex flex-col bg-white sm:h-full text-gray sm:flex-row">
        {/* Left */}
        <div className="flex flex-col justify-between border-gray border-b-2 sm:w-48% sm:border-b-0 sm:border-r-2">
          {/* Content */}
          <div className="flex flex-col justify-center h-full px-16px lg:px-32px xl:px-48px">
            {/* Header */}
            <div className="flex flex-col pt-32px sm:px-0 sm:pt-0 sm:-mt-32px lg:px-32px">
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
                  error ? (
                    <div className="px-16px pb-8px">{error}</div>
                  ) : (
                    <div className="flex justify-center pb-8px">
                      <ReactLoading height={56} type="spin" width={56} />
                    </div>
                  )
                ) : (
                  <div className="pl-16px">
                    {trending?.map((trend, index) => {
                      return (
                        <div
                          className={`inline-flex mr-16px mb-8px lg:mb-16px ${
                            isLoading && !error ? 'opacity-50' : 'opacity-100'
                          }`}
                          key={index}
                        >
                          <Button
                            render={
                              <Chip
                                style={`${
                                  isLoading && !error
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
          className={`flex flex-col ${
            isLoading || (!isLoading && !wordcloud?.length)
              ? 'justify-center'
              : 'justify-evenly'
          } px-16px md:px-32px xl:px-80px sm:w-52% bg-green-light`}
        >
          {searched ? (
            <>
              {/* Header */}
              <div
                className={`${
                  isLoading ? 'text-center' : 'text-right'
                } pt-40 pb-32px sm:p-0`}
              >
                <p className="header-text">
                  {Text.RESULTADOS_DA_BUSCA_POR}
                  {isLoading ? Text.SPACE : null}
                </p>
                <p
                  className={`header-text truncate underline text-green ${
                    isLoading ? 'inline' : 'block'
                  }`}
                >
                  {searched}
                </p>
                {isLoading ? (
                  <p className="text-xs truncate pt-8px">{Text.LOADING}</p>
                ) : null}
              </div>

              {/* Bottom */}
              <div className="flex flex-col">
                {isLoading ? (
                  error ? (
                    <div className="pb-40 pt-16px sm:pb-0">{error}</div>
                  ) : (
                    <div className="flex justify-center pb-40 pt-8px sm:pb-0">
                      <ReactLoading height={56} type="bubbles" width={56} />
                    </div>
                  )
                ) : (
                  <>
                    {/* Wordcloud */}
                    {wordcloud?.length ? (
                      <div className="flex justify-center w-full">
                        <ShadowBox
                          padding={`p-0 ${
                            wordcloud.length <= 5 ? 'p-16px' : ''
                          }`}
                        >
                          <div className="flex items-center font-semibold text-center">
                            <TagCloud
                              maxSize={wordcloudTextSize.max}
                              minSize={wordcloudTextSize.min}
                              tags={wordcloud}
                            />
                          </div>
                        </ShadowBox>
                      </div>
                    ) : null}

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
                          pieSliceText:
                            chart && (chart[1][1] === 0 || chart[2][1] === 0)
                              ? 'none'
                              : 'percentage',
                          pieSliceTextStyle: {
                            color: '#FFFFFF',
                            fontName: 'Oxygen',
                            fontSize: 16,
                          },
                          pieStartAngle: 90,
                        }}
                      />

                      {/* Legend */}
                      <div
                        className={`${
                          isLoading && !error ? 'hidden' : 'block'
                        } text-right font-semibold`}
                      >
                        {Text.TOTAL}: {total}{' '}
                        {total > 1
                          ? Text.TWEETS_ANALISADOS
                          : Text.TWEET_ANALISADO}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col py-40 font-medium text-center text-md sm:p-0">
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
