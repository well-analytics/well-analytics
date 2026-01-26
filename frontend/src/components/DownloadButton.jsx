function startDownload(rows, filename) {
  const csv = rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename + ".csv";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function targetIntervalCSV(data) {
  let rows = [];  // Assume flowing and shutin have same structure
  for (let i = 0; i < data.length; i++) {
    const entries = Math.max(
      ...Object.values(data[i]).map(arr => arr.length)
    );

    for (let j = 0; j < entries; j++) {
      let row = [];
      for (const arr of Object.values(data[i])) {
        row.push(j < arr.length ? arr[j] : "");
      }
      rows.push(row);
    }
  }
  rows.sort((a, b) => a[0] - b[0])
  rows.unshift(Object.keys(data[0]))
  rows.map((row) => row.join(","))

  startDownload(rows, "intervals")
};

function loglogCSV(data) {
  for (let i = 0; i < data.length; i++) {
    let rows = [["Time/hr", "Pressure/bar", "Derivative/bar"]]
    const entries = Math.max(
      data[i].pn_saphir.length, data[i].derivative_saphir.length, data[i].Delta_Time.length
    );
    for (let j = 0; j < entries; j++) {
      let row = [data[i].Delta_Time[j], data[i].pn_saphir[j], data[i].derivative_saphir[j]]
      rows.push(row)
    }
    rows.map((row) => row.join(","))
    startDownload(rows, `loglog_${i + 1}`)
  }
}

const CSVGenerators = { "targetInterval": targetIntervalCSV, "loglog": loglogCSV }

function DownloadButton({ data, text, CSVGenerator }) {
  const handleDownload = () => {
    CSVGenerators[CSVGenerator](data)
  }
  return (
    <button onClick={handleDownload} className="ml-5 mr-20">
      {text}
    </button>
  );
}

export default DownloadButton;
