import { useState } from "react";
import { Upload, Leaf, Loader2, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "./LanguageContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function AIDoctor() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");
  const { language } = useLanguage();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Str = reader.result?.toString().split(",")[1];
      if (base64Str) {
        setImage(base64Str);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/ai-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageParams: { data: image, mimeType: mimeType }, language }),
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
        throw new Error(data.error || "Failed to analyze image");
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(220,38,38,0.1)] transition-all duration-300 mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-gradient-to-br from-red-100 to-red-50 text-red-600 rounded-2xl shadow-inner">
          <Leaf className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-gray-900">AI Crop Doctor</h2>
          <div className="text-gray-500 mt-1">Instant AI diagnosis for your crop problems.</div>
        </div>
      </div>

      <div className="text-gray-600 mb-8">
        Upload a photo of your diseased plant or crop, and the AI Doctor will help identify the issue and recommend treatments.
      </div>

      <div className="mb-6">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload plant photo</p>
            <p className="text-xs text-gray-500">PNG or JPG</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {image && (
        <div className="mb-6 flex flex-col items-center">
          <img src={`data:${mimeType};base64,${image}`} alt="Plant to analyze" className="h-48 object-cover rounded-lg border shadow-sm mb-4" />
          <button
            onClick={analyzeImage}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition-colors shadow-sm active:scale-[0.99]"
          >
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
            {loading ? "Analyzing Image..." : "Analyze Plant Issue"}
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Diagnosis Report</h3>
          <div id="ai-doctor-report" className="prose prose-red max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-inner overflow-hidden">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([result], {type: 'text/markdown'});
                element.href = URL.createObjectURL(file);
                element.download = "crop-doctor-report.md";
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
                const element = document.getElementById("ai-doctor-report");
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
                  pdf.save('crop-doctor-report.pdf');
                }
              }} 
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
