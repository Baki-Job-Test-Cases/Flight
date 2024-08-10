export type RejectWithReason<K extends string> = (K extends ''
    ? object
    : {
          [key in K]: false;
      }) & {
    error: string;
};
