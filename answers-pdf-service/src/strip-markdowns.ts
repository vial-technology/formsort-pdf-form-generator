import { remark } from 'remark';
import strip from 'strip-markdown';

const markdown = remark().use(strip);
export const stripMarkdowns = async (strings: string[]): Promise<string[]> => {
  const res = await Promise.all(
    strings.map((s) => markdown.process('\n' + s + '\n'))
  );
  return res.map((value) => String(value).replaceAll(/\\#+/g, ''));
};
