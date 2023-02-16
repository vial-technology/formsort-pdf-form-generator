import type { GenerateHTMLOptions } from '../../src/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFlowContentJSONFromAPI } from '../../src/flow-content-api';
import { generateHTML } from '../../src/generate-html';
import { generatePDF } from '../../src/generate-pdf';
import { uploadBufferToS3 } from '../../src/upload-to-s3';
import { time } from '../../src/utils';
import { getPDFParametersFromRequest } from '../../src/request-processing';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { variantRevisionUuid, answers, responderUuid } =
    getPDFParametersFromRequest(req);

  const options: GenerateHTMLOptions = {
    includeAnswerKeys: true,
  };

  const flowContent = await getFlowContentJSONFromAPI(variantRevisionUuid);
  const pageHTML = await generateHTML({
    answers,
    flowContent,
    options,
  });
  const pdfBuffer = await time(generatePDF, [pageHTML]);
  const pdfUrl = await uploadBufferToS3(pdfBuffer, `${responderUuid}.pdf`);

  return res.json({
    url: pdfUrl,
  });
};

export default handler;
