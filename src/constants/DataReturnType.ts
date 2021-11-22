import { WorcloudObjType } from '.';

export type DataReturnType = {
  positive: number;
  negative: number;
  positives_explained: WorcloudObjType[];
  negatives_explained: WorcloudObjType[];
};
