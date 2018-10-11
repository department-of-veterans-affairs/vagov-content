/**
 * An example PerformanceNavigationTimingEntry
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
 */
export const navEntry = {
  name: 'http://localhost:3001/',
  entryType: 'navigation',
  startTime: 0,
  duration: 1990,
  initiatorType: 'navigation',
  nextHopProtocol: 'http/1.1',
  workerStart: 0,
  redirectStart: 0,
  redirectEnd: 0,
  fetchStart: 0,
  domainLookupStart: 0,
  domainLookupEnd: 0,
  connectStart: 0,
  connectEnd: 0,
  secureConnectionStart: 0,
  requestStart: 65,
  responseStart: 69,
  responseEnd: 73,
  transferSize: 53859,
  encodedBodySize: 53563,
  decodedBodySize: 53563,
  serverTiming: [],
  unloadEventStart: 0,
  unloadEventEnd: 0,
  domInteractive: 373,
  domContentLoadedEventStart: 1103,
  domContentLoadedEventEnd: 1215,
  domComplete: 1965,
  loadEventStart: 1965,
  loadEventEnd: 1990,
  type: 'navigate',
  redirectCount: 0,
};
