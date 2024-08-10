export type RejectWithReason<K extends string> = (K extends ''
    ? {}
    : {
          [key in K]: false;
      }) & {
    error: string;
};
