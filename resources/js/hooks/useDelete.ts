import { useEffect, useState } from "react";
import axios from "axios";

const useDelete = (url: string, id: number, message?: string) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const deleteData = async () => {
            setLoading(true);
            setError(null);

            try {
                await axios.delete(url);
            } catch (err) {
                setError(err.message || "Error deleting data");
            } finally {
                setLoading(false);
            }
        };

        deleteData();
    }, [url, id]);

    return { error, loading };
};

export default useDelete;
