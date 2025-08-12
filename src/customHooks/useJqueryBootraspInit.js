import { useEffect } from "react";
import $ from "jquery";

const useJQueryBootstrapInit = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Initialize tooltips & dropdowns *after* a slight delay
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="dropdown"]').dropdown();
    }, 0); // slight delay to let DOM finish rendering

    return () => clearTimeout(timeout);
  }, []);
};

export default useJQueryBootstrapInit;
