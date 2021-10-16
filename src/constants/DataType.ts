export type WorcloudObjType = {
  word: string;
  relevance: number;
};

export type DataType = {
  positive: number;
  negative: number;
  positives_explained: WorcloudObjType[];
  negatives_explained: WorcloudObjType[];
};
