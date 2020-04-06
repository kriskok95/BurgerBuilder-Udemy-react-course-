import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqIntreceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const resIntreceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      axios.interceptors.request.eject(reqIntreceptor);
      axios.interceptors.request.eject(resIntreceptor);
    }, [reqIntreceptor, resIntreceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };
    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
