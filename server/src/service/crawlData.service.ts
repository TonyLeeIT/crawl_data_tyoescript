import axios from "axios";
import cheerio from "cheerio";
import { log } from "../logger/index";

export const getDomElement = async (url: string) => {
  try {
    const res = await axios.get(url);
    const html: any = res.data;
    if (res.status === 200) {
      return cheerio.load(html);
    } else {
      return;
    }
  } catch (error) {
    log.error(error);
  }
};
