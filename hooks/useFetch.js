import { useState, useEffect } from "react";
import { appData } from "../constants";
// import axios from "axios";

const useFetch = (endpoint, job_id) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        setIsLoading(true);

        try {
             
            // const { data } = await axios.request(options);

            // setData(data);

            await new Promise(res => setTimeout(res, Math.random() * 1000));

            // I did the fetch without axios because of the error with rapid api
            if (endpoint === "search") {
              setData(appData);
            } else if (endpoint === "job-details") {
              setData(appData.find(data => data.job_id === job_id))
            }

        } catch (error) {

            setError(error);

            alert("There is an error");

        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {
        data,
        isLoading,
        error,
        refetch,
    }
}


export default useFetch;