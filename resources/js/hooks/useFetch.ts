import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            axios
                .get(url)
                .then(({ data }) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError("Error fetching data");
                });
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};
