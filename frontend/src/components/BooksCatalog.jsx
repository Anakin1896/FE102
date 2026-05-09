import React from 'react';
import { 
  LayoutDashboard, ScanLine, BookOpen, ArrowLeftRight, 
  Users, FileText, ShieldAlert, LogOut, Search, Filter, 
  Eye, Edit, Trash2, Plus
} from 'lucide-react';

const BooksCatalog = ({ books = [], onAddBook }) => {
  return (
    <div className="flex h-screen bg-[#1a202c] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#151a23] border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="bg-[#00a3ff] p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">LibTrack</h1>
              <p className="text-[10px] text-gray-400">Next-Gen Library System</p>
            </div>
          </div>

          <nav className="px-4 space-y-1 mt-4">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition-colors">
              <LayoutDashboard className="w-5 h-5" /> <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition-colors">
              <ScanLine className="w-5 h-5" /> <span className="text-sm font-medium">OCR Digitization</span>
            </a>

            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-[#00a3ff] text-white rounded-xl shadow-[0_0_15px_rgba(0,163,255,0.3)] transition-colors">
              <BookOpen className="w-5 h-5" /> <span className="text-sm font-medium">Books</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition-colors">
              <ArrowLeftRight className="w-5 h-5" /> <span className="text-sm font-medium">Transactions</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition-colors">
              <Users className="w-5 h-5" /> <span className="text-sm font-medium">Users</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition-colors">
              <FileText className="w-5 h-5" /> <span className="text-sm font-medium">Reports</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl transition-colors">
              <ShieldAlert className="w-5 h-5" /> <span className="text-sm font-medium">Audit Logs</span>
            </a>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl mb-2 border border-gray-700/50">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold text-sm">AD</div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@libtrack.io</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors w-full">
            <LogOut className="w-4 h-4" /> <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="p-8 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#00a3ff] p-3 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Books Catalog</h2>
              <p className="text-gray-400">Browse and manage your collection</p>
            </div>
          </div>
          <button 
            onClick={onAddBook}
            className="flex items-center gap-2 bg-[#00a3ff] hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Book
          </button>
        </header>

        {/* Search and Filters */}
        <div className="px-8 py-4 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              className="w-full bg-[#1e2532] border border-gray-700/50 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a3ff] transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#1e2532] border border-gray-700/50 rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4 text-gray-400" />
            All
          </button>
        </div>

        {/* Books Grid area */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {books.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-700/50 rounded-2xl bg-[#1e2532]/30 p-8">
              <BookOpen className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">No books in catalog</h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Your library database is currently empty. Click the button below or in the top right to register your first book.
              </p>
              <button 
                onClick={onAddBook}
                className="flex items-center gap-2 bg-[#1e2532] border border-gray-700 hover:border-gray-500 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                <Plus className="w-5 h-5" /> Add First Book
              </button>
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <div key={book.id} className="bg-[#2d3748] rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-gray-500 font-medium">{book.id}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${book.statusColor} ${book.statusBg}`}>
                      {book.status}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg leading-tight mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{book.author}</p>

                  {book.qrPath && (
                    <div className="flex flex-col items-center mb-4 bg-[#1a202c] p-3 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase font-semibold mb-2">QR Code</p>
                      <img
                        src={`http://localhost:5232${book.qrPath}`}
                        alt={`QR code for ${book.title}`}
                        className="w-24 h-24 rounded-lg"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-6 bg-[#1a202c] p-4 rounded-xl">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">ISBN</p>
                      <p className="text-sm font-medium">{book.isbn}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Category</p>
                      <p className="text-sm font-medium truncate">{book.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Total</p>
                      <p className="text-sm font-medium">{book.total}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Available</p>
                      <p className={`text-sm font-bold ${book.statusColor}`}>{book.available}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6 mt-auto">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Availability</span>
                      <span className="text-gray-400">{book.percent}%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${book.barColor} rounded-full`} style={{ width: `${book.percent}%` }}></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-xs font-semibold col-span-1">
                      <Eye className="w-4 h-4 text-gray-400" /> View
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-xs font-semibold col-span-1">
                      <Edit className="w-4 h-4 text-gray-400" /> Edit
                    </button>
                    <button className="flex items-center justify-center py-2 px-3 rounded-lg bg-gray-800 hover:bg-red-900/50 hover:text-red-400 transition-colors col-span-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BooksCatalog;