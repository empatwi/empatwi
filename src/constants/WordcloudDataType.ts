export type WorcloudObjType = {
  word: string;
  relevance: number;
};

export type WordcloudDataType = {
  positive: number;
  negative: number;
  positives_explained: WorcloudObjType[];
  negatives_explained: WorcloudObjType[];
};
