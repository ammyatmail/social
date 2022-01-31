import * as React from "react";
import { ApiClient } from "ApiClient";

export function useApiClient<T>(
  url: string,
  queryStringData?: { [key: string]: any }
): [{ data?: T; loading: boolean; error: string; refetch: () => void }] {
  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const loadData = React.useCallback(
    async function loadData() {
      try {
        setLoading(true);
        const response = await ApiClient.get<T>(url, queryStringData);
        if (!response) {
          return;
        }
        setData(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, queryStringData]
  );

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return [{ data, loading, error, refetch: loadData }];
}
