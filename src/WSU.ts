import * as cheerio from "cheerio";
import { Errors } from "./config";

interface Student {
  name: string;
  email: string;
  dept: string;
  major: string;
}

/**
 * WSU class to scrape student information
 */
export default class WSU {
  private baseURL: string = "https://wayne.edu/people";
  public async lookup(accessId: string): Promise<Student> {
    if (!WSU.validate(accessId)) {
      throw new Error(Errors.VERIFICATION_FAILED);
    }
    const url = `${this.baseURL}/${accessId.toLowerCase()}`;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    let prename = $("title").text();
    const name =
      prename.indexOf("(") > -1
        ? prename.substring(0, prename.indexOf("(")).trim()
        : prename.trim();
    const email = $('a[href$="@wayne.edu"]').first().text();
    const major = $("div.content > p:contains('Major:')")
      .text()
      .replace(/Major: /, "")
      .trim();
    const dept = $("div > div:contains('Department: ')")
      .last()
      .text()
      .replace(/Department: /, "")
      .trim();

    return {
      name,
      email,
      dept: dept.length > 50 ? "" : dept, // incase scraping failed
      major: major.length > 50 ? "" : major, // incase scraping failed
    };
  }

  public static validate(accessId: string): boolean {
    return /^[a-z]{2}\d{4}$/i.test(accessId);
  }
}

// const wsu = new WSU();
// wsu.lookup("hh3509").then(console.log).catch(console.error);
