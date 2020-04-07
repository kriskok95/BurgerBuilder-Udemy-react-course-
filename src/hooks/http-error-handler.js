import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqIntreceptor = httpClient.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const resIntreceptor = httpClient.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      httpClient.interceptors.request.eject(reqIntreceptor);
      httpClient.interceptors.request.eject(resIntreceptor);
    }, [reqIntreceptor, resIntreceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler];
}