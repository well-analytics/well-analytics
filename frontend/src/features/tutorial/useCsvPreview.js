import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useCsvPreview(url, maxRows = 5) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.filter(Boolean).slice(0, maxRows);

        if (data.length > 0) {
          setColumns(Object.keys(data[0]));
          setRows(data.map((row) => Object.values(row)));
        }
      },
    });
  }, [url, maxRows]);

  return { columns, rows };
}
