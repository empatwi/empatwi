import {
  Colors,
  DataReturnType,
  GraphType,
  Text,
  TrendingDataType,
  WorcloudObjType,
  WordcloudType,
} from './constants';

/* ===+=== Trending ===+=== */
export const sortTrendingTopics = (
  data: TrendingDataType[]
): TrendingDataType[] =>
  data
    // Keep only the most relevant ocurrance of a trending topic
    .sort((a, b) => b.tweet_volume - a.tweet_volume)
    .filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i)
    .slice(0, 10);

/* ===+=== Wordcloud ===+=== */
const mapWordcloud = (arr: WorcloudObjType[], color: string): WordcloudType[] =>
  arr
    // Parse
    .map((data) => {
      const relevance = data?.relevance;
      const isPos = relevance > 0;

      return {
        value: data?.word,
        count: isPos ? relevance : Math.abs(relevance),
        color,
      };
    })
    // Keep only the most relevant ocurrance of a repeated term
    .sort((a, b) => b.count - a.count)
    .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);

export const parseWordcloudData = (data: DataReturnType): WordcloudType[] => {
  const { negatives_explained: neg, positives_explained: pos } = data;

  const parsedPos = mapWordcloud(pos, Colors.GREEN);
  const parsedNeg = mapWordcloud(neg, Colors.RED);

  // Shuffles the data array and takes first n items
  const parsedData = [...parsedPos, ...parsedNeg]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 18);

  return parsedData;
};

/* ===+=== Graph ===+=== */
export const parseGraphData = (
  data: DataReturnType
): { chart: GraphType; colors: Array<string>; total: number } => {
  const { negative, positive } = data;

  const total = positive + negative;

  const chart = [
    [Text.TWEETS, Text.QUANTIDADE],
    [Text.TWEETS_POSITIVOS, positive],
    [Text.TWEETS_NEGATIVOS, negative],
  ];

  const colors = [Colors.GREEN, Colors.RED];

  return { chart, colors, total };
};
