import { Config } from '../config';

export function getAuthHeaders(token?: string | null) {
  return {
    authorization: token ? `Bearer ${token}` : '',
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT
    // TODO add "enforce" and set a relevant "max-age"
    'Expect-CT': `max-age=0, report-uri="${Config.API_BASE_URL}/ct-error"`,
  };
}
