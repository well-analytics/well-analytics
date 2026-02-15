import { useRef, useState } from "react";
import api from "../api.js";
import demo from "../data/demo.json"

export default function TwoFileUploadButtons({ uploadUrl, onSuccess, onError }) {
  const inputARef = useRef(null);
  const inputBRef = useRef(null);

  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [loading, setLoading] = useState(false);

  const canUpload = fileA && fileB && !loading;

  const handleUpload = async () => {
    if (!canUpload) return;

    const formData = new FormData();
    formData.append("pressure_series", fileA);
    formData.append("rate_series", fileB);

    try {
      setLoading(true);
      const response = await api.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data)
      onSuccess?.(response.data);
    } catch (err) {
      onError?.(err);
    } finally {
      setLoading(false);
      setFileA(null);
      setFileB(null);
      if (inputARef.current) inputARef.current.value = "";
      if (inputBRef.current) inputBRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <button
        type="button"
        onClick={() => onSuccess?.(demo)}
        className="px-4 py-2 rounded-2xl shadow-sm text-white bg-[#730000]"
      >
        Demo
      </button>

      <input
        ref={inputARef}
        type="file"
        className="hidden"
        onChange={(e) => setFileA(e.target.files?.[0] || null)}
      />

      <input
        ref={inputBRef}
        type="file"
        className="hidden"
        onChange={(e) => setFileB(e.target.files?.[0] || null)}
      />
      <p><i>i</i></p>
      <button
        type="button"
        onClick={() => inputARef.current?.click()}
        className="px-4 py-2 rounded-2xl shadow-sm text-white"
      >
        {fileA ? fileA.name : "Select Pressure Time Series"}
      </button>

      <button
        type="button"
        onClick={() => inputBRef.current?.click()}
        className="px-4 py-2 rounded-2xl shadow-sm text-white"
      >
        {fileB ? fileB.name : "Select Rate Time Series"}
      </button>

      <button
        type="button"
        disabled={!canUpload}
        onClick={handleUpload}
        className="px-4 py-2 rounded-2xl shadow-sm bg-blue-600 text-white disabled:opacity-50"
        style={{ "background-color": "#006a9c" }}
      >
        {loading ? "Running" : "Run"}
      </button>
    </div>
  );
}
