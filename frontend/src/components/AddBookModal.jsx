import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { createBook } from '../services/api';

const AddBookModal = ({ onClose, onBookAdded }) => {
  const [method, setMethod] = useState('manual');
  const [form, setForm] = useState({ isbn: '', title: '', author: '', quantity: '', category: 'Computer Science' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const scannerRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Parse structured QR content: "BookId:...;ISBN:...;Title:...;Author:...;Category:..."
  const parseQrContent = (text) => {
    if (!text.includes(';') || !text.includes(':')) return null;
    const parts = {};
    text.split(';').forEach((segment) => {
      const idx = segment.indexOf(':');
      if (idx === -1) return;
      parts[segment.substring(0, idx).trim()] = segment.substring(idx + 1).trim();
    });
    if (!parts.ISBN) return null;
    return {
      isbn: parts.ISBN || '',
      title: parts.Title || '',
      author: parts.Author || '',
      quantity: parts.Quantity || '',
      category: parts.Category || 'Computer Science',
    };
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (_) {}
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const startScanner = async () => {
    setScanError('');
    setScanning(true);
    // Small delay so the div is rendered before we attach the scanner
    setTimeout(async () => {
      try {
        const html5QrCode = new Html5Qrcode('qr-reader', {
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
          ],
        });
        scannerRef.current = html5QrCode;
        await html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 15, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            const parsed = parseQrContent(decodedText);
            if (parsed) {
              setForm(parsed);
            } else {
              // Plain barcode — just populate ISBN
              setForm((prev) => ({ ...prev, isbn: decodedText }));
            }
            stopScanner();
            setMethod('manual');
          },
          () => {} // ignore per-frame errors
        );
      } catch (err) {
        setScanning(false);
        setScanError('Camera access denied or not available. Please allow camera permission.');
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setError('');
    if (!form.isbn || !form.title || !form.author || !form.quantity) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      setLoading(true);
      await createBook({ ...form, quantity: parseInt(form.quantity, 10) });
      onBookAdded?.();
      onClose();
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-lib-card w-full max-w-lg rounded-xl p-6 text-white shadow-2xl border border-gray-700/50">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3">
            <div className="bg-lib-blue p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Add New Book</h2>
              <p className="text-gray-400 text-sm">Choose your preferred input method</p>
            </div>
          </div>
          {/* Added onClick={onClose} to the X button */}
          <button onClick={() => { stopScanner(); onClose(); }} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        {/* Method Toggles */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => { stopScanner(); setMethod('scanner'); setScanError(''); }}
            className={`p-4 rounded-xl border transition-all ${method === 'scanner' ? 'bg-gradient-to-br from-cyan-400 to-lib-blue border-transparent shadow-lg shadow-blue-500/20' : 'bg-slate-800/50 border-gray-700'}`}
          >
             <div className="text-2xl mb-1">QR</div>
             <div className="font-bold">QR/Barcode Scanner</div>
             <div className="text-xs opacity-70">Scan ISBN barcode</div>
          </button>

          <button 
            onClick={() => { stopScanner(); setMethod('manual'); setScanError(''); }}
            className={`p-4 rounded-xl border transition-all ${method === 'manual' ? 'bg-gradient-to-br from-fuchsia-500 to-lib-pink border-transparent shadow-lg shadow-pink-500/20' : 'bg-slate-800/50 border-gray-700'}`}
          >
             <div className="text-2xl mb-1">⌨</div>
             <div className="font-bold">Manual Input</div>
             <div className="text-xs opacity-70">Type book details</div>
          </button>
        </div>

        {/* Form Fields */}
        {method === 'manual' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ISBN</label>
              <input name="isbn" value={form.isbn} onChange={handleChange} type="text" placeholder="978-0-262-03384-8" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Book Title</label>
              <input name="title" value={form.title} onChange={handleChange} type="text" placeholder="Introduction to Algorithms" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Author</label>
              <input name="author" value={form.author} onChange={handleChange} type="text" placeholder="Thomas H. Cormen" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Quantity</label>
                <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="10" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all text-white">
                  <option>Computer Science</option>
                  <option>Software Engineering</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Engineering</option>
                  <option>Business & Economics</option>
                  <option>Psychology</option>
                  <option>History</option>
                  <option>Literature</option>
                  <option>Philosophy</option>
                  <option>Art & Design</option>
                  <option>Medicine & Health</option>
                  <option>Law</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-700 rounded-xl bg-[#1a202c]">
            {/* Scanner viewport — html5-qrcode mounts into this div */}
            <div
              id="qr-reader"
              className="w-full rounded-xl overflow-hidden"
              style={{ minHeight: scanning ? 260 : 0 }}
            />

            {!scanning && (
              <>
                <div className="w-32 h-32 border-2 border-lib-blue rounded-xl flex items-center justify-center mb-4 mt-2">
                  <span className="text-lib-blue font-bold">QR Area</span>
                </div>
                <h3 className="font-bold text-lg">Ready to Scan</h3>
                <p className="text-sm text-gray-400 mb-4">Position the barcode within the frame</p>
              </>
            )}

            {scanError && <p className="text-red-400 text-sm mb-3 text-center">{scanError}</p>}

            {!scanning ? (
              <button
                onClick={startScanner}
                className="bg-lib-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Stop Scanning
              </button>
            )}
          </div>
        )}

        {/* Error message */}
        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button onClick={() => { stopScanner(); onClose(); }} className="py-3 px-6 rounded-full bg-slate-800 border border-gray-700 hover:bg-slate-700 transition-colors font-bold">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="py-3 px-6 rounded-full bg-lib-teal hover:bg-teal-400 text-white font-bold transition-colors disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;