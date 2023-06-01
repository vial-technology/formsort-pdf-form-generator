import { NextApiRequest } from 'next';

import { z } from 'zod';
export const GeneratePDFRequestParametersModel = z.object({
  variantRevisionUuid: z.string().uuid(),
  answers: z.record(z.string(), z.any()),
  formName: z.string()
});

type GeneratePDFRequestParameters = z.infer<
  typeof GeneratePDFRequestParametersModel
>;

export const getPDFParametersFromRequest = (
  req: NextApiRequest
): GeneratePDFRequestParameters => {
  const params = getParamsFromGETRequest(req);
  return GeneratePDFRequestParametersModel.parse(params);
};

const getParamsFromGETRequest = (req: NextApiRequest) => {
  const { variantRevisionUuid, formName } = req.query;
  return {
    variantRevisionUuid,
    formName,
    answers: {} // empty for now
  };
};
