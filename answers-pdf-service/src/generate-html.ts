import { getCSS } from './style';
import nunjucks from 'nunjucks';
import { DenormVariantRevision } from './schemas';

export const generateHTML = async ({
  answers,
  flowContent,
  formName
}: {
  answers: Record<string, any>;
  flowContent: DenormVariantRevision;
  formName: string;
}) => {
  const css = await getCSS();
  const context = {
    css,
    ...flowContent,
    formName,
  };
  return nunjucks.render('src/pages/questions-list.njk', context);
};
