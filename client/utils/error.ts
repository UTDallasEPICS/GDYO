import * as util from "util";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const report = (err: any): void => {
  // if (process.env.NODE_ENV === "production") {
  //   Sentry.captureException(ErrorWrap(err));
  // } else {
  //   console.error(ErrorWrap(err));
  // }

  console.error(
    JSON.stringify({
      name: ErrorWrap(err).name,
      message: ErrorWrap(err).message,
      cause: ErrorWrap(err).cause,
    })
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorWrap = (err: any): Error => {
  let formatError: Error = err;

  if (formatError instanceof Error === false) {
    if (typeof err === "object") {
      // https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
      // I avoid JSON.stringify because err can be cyclic JSON.
      formatError = new Error(
        util.inspect(err, {
          compact: false,
          depth: process.env.NODE_ENV === "development" ? Infinity : 6,
        })
      );
    } else {
      formatError = new Error(String(err));
    }
  }

  return formatError;
};
