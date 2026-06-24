import { useState } from 'react';
import { X, Upload, FileText, Loader2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from './LanguageContext';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface SoilAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SoilAnalyzerModal({ isOpen, onClose }: SoilAnalyzerModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState('');
  const { language } = useLanguage();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Str = reader.result?.toString().split(',')[1];
      if (base64Str) {
        setImage(base64Str);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeReport = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/analyze-soil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        throw new Error(data.error || 'Failed to analyze soil report');
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setMimeType('');
    setResult('');
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        />
      )}
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20"
        >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="text-green-600 w-6 h-6" />
              Analyze Soil Report
            </h2>
            <p className="text-gray-500 mb-6">
              Upload an image of your soil test report, and our AI will extract the key metrics and provide actionable crop recommendations.
            </p>

            {!result && !loading && (
              <>
                <div className="mb-6">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload soil report</p>
                      <p className="text-xs text-gray-400">PNG, JPG, or PDF image</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>

                {image && (
                  <div className="flex flex-col items-center gap-4">
                    <img src={`data:${mimeType};base64,${image}`} alt="Report Preview" className="h-40 object-contain rounded border shadow-sm" />
                    <button
                      onClick={analyzeReport}
                      className="w-full flex items-center justify-center bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition shadow-md hover:shadow-lg active:scale-[0.98]"
                    >
                      Process Report with AI
                    </button>
                    <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-700">Clear Image</button>
                  </div>
                )}
              </>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-4" />
                <p className="text-gray-600 font-medium animate-pulse">Analyzing soil metrics...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 mb-4">
                {error}
                <button onClick={() => setError('')} className="block mt-2 text-sm underline">Try Again</button>
              </div>
            )}

            {result && (
              <div className="mt-4">
                <div id="soil-analysis-report" className="prose prose-green max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-inner overflow-hidden">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                <div className="mt-6 flex justify-end gap-3 flex-wrap">
                  <button 
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([result], {type: 'text/markdown'});
                      element.href = URL.createObjectURL(file);
                      element.download = "soil-analysis-report.md";
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
                      const element = document.getElementById("soil-analysis-report");
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
                        pdf.save('soil-analysis-report.pdf');
                      }
                    }} 
                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button onClick={reset} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    Analyze Another
                  </button>
                </div>
              </div>
            )}
          </motion.div>
      )}
    </AnimatePresence>
  );
}
