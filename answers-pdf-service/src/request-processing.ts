import { NextApiRequest } from 'next';

import { z } from 'zod';
export const GeneratePDFRequestParametersModel = z.object({
  responderUuid: z.string().uuid(),
  variantRevisionUuid: z.string().uuid(),
  answers: z.record(z.string(), z.any()),
});

type GeneratePDFRequestParameters = z.infer<
  typeof GeneratePDFRequestParametersModel
>;

export const getPDFParametersFromRequest = (
  req: NextApiRequest
): GeneratePDFRequestParameters => {
  const params =
    req.method === 'POST'
      ? getParamsFromPOSTRequest(req)
      : getParamsFromGETRequest(req);
  return GeneratePDFRequestParametersModel.parse(params);
};

const getParamsFromPOSTRequest = (req: NextApiRequest): object => {
  const {
    answers,
    variant_uuid: variantRevisionUuid,
    responder_uuid: responderUuid,
  } = req.body;
  return {
    answers,
    variantRevisionUuid,
    responderUuid,
  };
};

const getParamsFromGETRequest = (req: NextApiRequest): object => {
  const { variantRevisionUuid, responderUuid, ...answers } = req.query;
  return {
    variantRevisionUuid,
    responderUuid,
    answers,
  };
};
