import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong!");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(payload) {
      let hasError = false;
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: payload,
        });
        setData(resData);
      } catch (error) {
        setFetchError(error.message);
        hasError = true;
      }
      setIsLoading(false);
      return hasError;
    },
    [url, config]
  );

  useEffect(() => {
    if (!config || !config.method || config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, isLoading, fetchError, sendRequest };
}
