import { performance } from 'perf_hooks';

export const time = async <T extends (...args: any) => any>(
  fn: T,
  args: Parameters<T>
): Promise<ReturnType<T>> => {
  const startTime = performance.now();
  const retValue = await fn.apply(null, args);
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`[${fn.name}] ${duration}ms`);
  return retValue;
};
