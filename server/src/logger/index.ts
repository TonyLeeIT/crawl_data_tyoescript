import logger from "pino";
import dayjs from "dayjs";

export const log = logger({
  prettyPrint: {
    colorize: true, // colorizes the log
    translateTime: "yyyy-dd-mm, h:MM:ss TT",
    
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
