import { useState } from "react";
import { CloudRain, Sun, Leaf, Loader2, Wind, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "./LanguageContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function SeasonCropDetector() {
  const [season, setSeason] = useState("Summer");
  const [region, setRegion] = useState("");
  const [conditions, setConditions] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const { language } = useLanguage();

  const analyzeCrops = async () => {
    if (!region) {
       setError("Please specify your region or soil type.");
       return;
    }
    
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/season-crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ season, region, conditions, language }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned an error: ${text.slice(0, 100)}...`);
      }
      if (!response.ok) {
        throw new Error(data.error || "Failed to recommend crops.");
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(22,163,74,0.1)] transition-all duration-300 mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 text-green-600 rounded-2xl shadow-inner">
          <Leaf className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-gray-900">Season Crop Predictor</h2>
          <div className="text-gray-500 mt-1">Get AI-powered recommendations for the best crops to plant.</div>
        </div>
      </div>

      <div className="space-y-6 mb-8 bg-white/40 p-6 rounded-2xl border border-white/40">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current or Upcoming Season:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Spring', 'Summer', 'Autumn', 'Winter'].map((s) => (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={`py-3 px-4 rounded-lg flex flex-col items-center justify-center gap-2 border transition-all ${
                  season === s 
                    ? 'border-green-600 bg-green-50 text-green-700 font-medium' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50 text-gray-600'
                }`}
              >
                {s === 'Summer' && <Sun className="w-5 h-5" />}
                {s === 'Winter' && <Wind className="w-5 h-5" />}
                {s === 'Spring' && <Leaf className="w-5 h-5" />}
                {s === 'Autumn' && <CloudRain className="w-5 h-5" />}
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region or State</label>
          <input 
             type="text" 
             placeholder="e.g., California, Maharashtra, Andes Mountains..." 
             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
             value={region}
             onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Additional Conditions (Soil type, water availability, etc.)</label>
           <textarea 
             placeholder="e.g., Loamy soil, frequent droughts, organic farming..." 
             className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
             value={conditions}
             onChange={(e) => setConditions(e.target.value)}
            />
        </div>

        <button
          onClick={analyzeCrops}
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium transition-colors shadow-sm active:scale-[0.99]"
        >
          {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
          {loading ? "Generating Recommendations..." : "Get Crop Recommendations"}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Recommended Crops</h3>
          <div id="season-crop-report" className="prose prose-green max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-inner overflow-hidden">
             <ReactMarkdown>{result}</ReactMarkdown>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([result], {type: 'text/markdown'});
                element.href = URL.createObjectURL(file);
                element.download = "crop-recommendations.md";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }} 
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Markdown
            </button>
            <button 
              onClick={async () => {
                const element = document.getElementById("season-crop-report");
                if (element) {
                  const canvas = await html2canvas(element, { scale: 2 });
                  const imgData = canvas.toDataURL('image/png');
                  const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4'
                  });
                  
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                  
                  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                  pdf.save('crop-recommendations.pdf');
                }
              }} 
              className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
