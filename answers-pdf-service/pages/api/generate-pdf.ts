import type { GenerateHTMLOptions } from '../../src/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFlowContentJSONFromAPI } from '../../src/flow-content-api';
import { generateHTML } from '../../src/generate-html';
import { generatePDF } from '../../src/generate-pdf';
import { time } from '../../src/utils';
import * as fs from 'fs';
import { getPDFParametersFromRequest } from '../../src/request-processing';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { variantRevisionUuid, answers } =
    getPDFParametersFromRequest(req);

  const options: GenerateHTMLOptions = {
    includeAnswerKeys: false,
    includeUnanswered: true,
    includeSelectChoices: true,
    includeInformationals: true,
    includeGroups: true,
    includeSteps: true,
  };

  const flowContent = await getFlowContentJSONFromAPI(variantRevisionUuid);
  const pageHTML = await generateHTML({
    answers,
    flowContent,
    options,
  });
  const pdfBuffer = await time(generatePDF, [pageHTML]);

  await fs.writeFileSync(`./test.pdf`, pdfBuffer, {
    encoding: 'utf-8'
  })
  console.log('done')
  //const pdfUrl = await uploadBufferToS3(pdfBuffer, `${responderUuid}.pdf`);

  return res.json({
    url: '',
  });
};

export default handler;
