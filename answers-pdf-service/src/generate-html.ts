import { getCSS } from './style';
import nunjucks from 'nunjucks';
import { DenormVariantRevision } from './schemas';

export const generateHTML = async ({
  answers,
  flowContent,
}: {
  answers: Record<string, any>;
  flowContent: DenormVariantRevision;
}) => {
  const css = await getCSS();
  const context = {
    css,
    ...flowContent,
  };
  return nunjucks.render('src/pages/questions-list.njk', context);
};
