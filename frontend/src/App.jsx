import { useState } from "react";
import NavigationBar from "./components/NavigationBar.jsx";
import UploadSection from "./features/upload/UploadSection.jsx";
import AnalysisSection from "./features/plots/AnalysisSection.jsx";
import TutorialSection from "./features/tutorial/TutorialSection.jsx";
import "./App.css";

function App() {
  const [resultData, setResultData] = useState(null);

  return (
    <div>
      <NavigationBar />
      <UploadSection onUploadSuccess={setResultData} />
      <TutorialSection resultData={resultData} />
      <AnalysisSection resultData={resultData} />
    </div>
  );
}

export default App;
