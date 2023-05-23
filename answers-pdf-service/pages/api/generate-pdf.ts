import type { NextApiRequest, NextApiResponse } from 'next';
import { getFlowContentJSONFromAPI } from '../../src/flow-content-api';
import { generateHTML } from '../../src/generate-html';
import { generatePDF } from '../../src/generate-pdf';
import { time } from '../../src/utils';
import { getPDFParametersFromRequest } from '../../src/request-processing';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { variantRevisionUuid, answers } =
    getPDFParametersFromRequest(req);

  const flowContent = await getFlowContentJSONFromAPI(variantRevisionUuid);
  const pageHTML = await generateHTML({
    answers,
    flowContent
  });
  const pdfBuffer = await time(generatePDF, [pageHTML]);

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="file.pdf"`
  );
  res.setHeader('Content-Type', 'application/pdf');

  return res.send(pdfBuffer)
};

export default handler;
