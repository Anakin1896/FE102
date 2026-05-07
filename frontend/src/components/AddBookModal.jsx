import React, { useState } from 'react';

const AddBookModal = ({ onClose }) => {
  const [method, setMethod] = useState('manual');

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
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        {/* Method Toggles */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setMethod('scanner')}
            className={`p-4 rounded-xl border transition-all ${method === 'scanner' ? 'bg-gradient-to-br from-cyan-400 to-lib-blue border-transparent shadow-lg shadow-blue-500/20' : 'bg-slate-800/50 border-gray-700'}`}
          >
             <div className="text-2xl mb-1">QR</div>
             <div className="font-bold">QR/Barcode Scanner</div>
             <div className="text-xs opacity-70">Scan ISBN barcode</div>
          </button>

          <button 
            onClick={() => setMethod('manual')}
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
              <input type="text" placeholder="978-0-262-03384-8" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Book Title</label>
              <input type="text" placeholder="Introduction to Algorithms" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Author</label>
              <input type="text" placeholder="Thomas H. Cormen" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Quantity</label>
                <input type="number" placeholder="10" className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Category</label>
                <select className="w-full bg-[#1a202c] border border-gray-700 rounded-xl p-3 focus:ring-2 focus:ring-lib-blue outline-none transition-all text-white">
                  <option>Computer Science</option>
                  <option>Software Engineering</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded-xl bg-[#1a202c]">
            <div className="w-32 h-32 border-2 border-lib-blue rounded-xl flex items-center justify-center mb-4">
                <span className="text-lib-blue font-bold">QR Area</span>
            </div>
            <h3 className="font-bold text-lg">Ready to Scan</h3>
            <p className="text-sm text-gray-400 mb-4">Position the barcode within the frame</p>
            <button className="bg-lib-blue hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors">Start Scanning</button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button onClick={onClose} className="py-3 px-6 rounded-full bg-slate-800 border border-gray-700 hover:bg-slate-700 transition-colors font-bold">Cancel</button>
          <button className="py-3 px-6 rounded-full bg-lib-teal hover:bg-teal-400 text-white font-bold transition-colors">Add Book</button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;