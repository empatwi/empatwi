import {
  Colors,
  TrendingDataType,
  WorcloudObjType,
  WordcloudDataType,
  WordcloudType,
} from './constants';

/* ===+=== Wordcloud ===+=== */
const mapWordcloud = (arr: WorcloudObjType[], color: string) =>
  arr.map((data) => {
    const relevance = data?.relevance;
    const isPos = relevance > 0;

    return {
      value: data?.word,
      count: isPos ? relevance : Math.abs(relevance),
      color,
    };
  });

export const parseWordcloudData = (
  data: WordcloudDataType
): { total: number; cloud: WordcloudType[] } => {
  const { positives_explained: pos, negatives_explained: neg } = data;

  const total = pos?.length + neg?.length;

  const parsedPos = mapWordcloud(neg, Colors.GREEN);
  const parsedNeg = mapWordcloud(neg, Colors.RED);

  // Shuffles the data array and takes first n items
  const parsedData = [...parsedPos, ...parsedNeg]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 18);

  return { total, cloud: parsedData };
};

/* ===+=== Trending ===+=== */
export const sortTrendingTopics = (
  data: TrendingDataType[]
): TrendingDataType[] =>
  data.sort((a, b) => b.tweet_volume - a.tweet_volume).slice(0, 10);
