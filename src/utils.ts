import * as R from 'ramda';


export const getParam = (input: any, key: string): string =>
  (R.propOr(null, key, input) as unknown) as string;
