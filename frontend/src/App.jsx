import { useState } from "react";
import FileUpload from "./components/FileUpload";
import "./App.css";
import PlotTIFamily from "./components/PlotTIFamily";
import NavigationBar from "./components/NavigationBar";
import PlotInput from "./components/PlotInput";
import DownloadButton from "./components/DownloadButton";

function App() {
  const [resultData, setResultData] = useState(null);
  const [showLoglog, setShowLoglog] = useState(false);
  return (
    <div>
      <NavigationBar />
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="p-10">
          <FileUpload
            uploadUrl="/"
            onSuccess={(
              result) => {
              setResultData(result);
              console.log(result.loglog_normalized);
            }
            }
          />
        </div>
      </div>
      <div className="w-full px-30 mb-30">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">
          <div>
            {resultData && (
              <div>
                <PlotInput
                  df_bhp={resultData.df_bhp}
                  df_rate={resultData.df_rate}
                  shutin={resultData.shutin}
                  flowing={resultData.flowing}
                />
                <DownloadButton
                  data={[resultData.shutin, resultData.flowing]}
                  text="Download Target Interval Data"
                  CSVGenerator="targetInterval"
                />
              </div>
            )}
          </div>
          {resultData ? (
            <div className="flex items-center justify-center">
              {showLoglog ? (
                <div className="w-full">
                  <PlotTIFamily logs={resultData.loglog_normalized} />
                  <div className="flex justify-end">
                    <DownloadButton
                      data={resultData.loglog_normalized}
                      text="Download Pressure and Rate Data"
                      CSVGenerator="loglog"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center border-4 border-dotted border-sky-500 w-full h-full">
                  <button
                    onClick={() => setShowLoglog(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Show log-log plot
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
