import fetch from 'node-fetch';
import { env } from './env';
import {
  type DenormVariantRevision,
  DenormVariantRevisionModel,
} from './schemas';
const { FORMSORT_API_URL, FORMSORT_API_KEY } = env;

const flowContentCache: Record<string, DenormVariantRevision> = {};
export const getFlowContentJSONFromAPI = async (
  variantRevisionUuid: string
): Promise<DenormVariantRevision> => {
  const cachedFlowContent = flowContentCache[variantRevisionUuid];
  if (cachedFlowContent) {
    return cachedFlowContent;
  }
  const url = `${FORMSORT_API_URL}/variant-revisions/${variantRevisionUuid}`;
  const response = await fetch(url, {
    headers: { 'x-api-key': FORMSORT_API_KEY },
  });
  const json = await response.json();
  if (typeof json !== 'object' || json === null || !('flowContent' in json)) {
    throw new Error('flowContent missing in response');
  }
  const flowContent = DenormVariantRevisionModel.parse(json.flowContent);
  flowContentCache[variantRevisionUuid] = flowContent;
  return flowContent;
};
