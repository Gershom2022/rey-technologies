import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  MessageSquare, TrendingUp, Clock, 
  CheckCircle, XCircle, Eye, RefreshCw,
  Search, ChevronLeft, ChevronRight,
  Edit, Trash2, Download, Filter,
  Mail, Phone, Calendar, Tag, AlertCircle, Users
} from "lucide-react";
import { authFetch } from "../utils/api";
import { useAuth } from "../hooks/useAuth";

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  
  // State management
  const [inquiries, setInquiries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    contacted: 0,
    today: 0,
    conversionRate: 0,
  });

  const ITEMS_PER_PAGE = 10;

  const loadData = async () => {
    if (!isAuthenticated) {
      setError('Please log in to access the dashboard');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const [inquiriesData, summaryData] = await Promise.all([
        authFetch('/api/inquiries'),
        authFetch('/api/analytics/summary')
      ]);
      
      const inquiriesList = inquiriesData.inquiries || [];
      const summaryList = summaryData.summary || [];
      
      setInquiries(inquiriesList);
      setSummary(summaryList);
      
      // Calculate statistics
      const total = inquiriesList.length;
      const pending = inquiriesList.filter(i => i.status === 'pending').length;
      const contacted = inquiriesList.filter(i => i.status === 'contacted').length;
      const today = inquiriesList.filter(i => 
        new Date(i.created_at).toDateString() === new Date().toDateString()
      ).length;
      const conversionRate = total > 0 ? Math.round((contacted / total) * 100) : 0;
      
      setStats({
        total,
        pending,
        contacted,
        today,
        conversionRate,
      });
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load dashboard data');
      
      if (err.message.includes('401') || err.message.includes('token')) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Date'];
    const rows = inquiries.map(inq => [
      inq.id,
      inq.name,
      inq.email,
      inq.phone || '',
      inq.subject || '',
      inq.message,
      inq.status,
      new Date(inq.created_at).toLocaleDateString()
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle marking inquiry as contacted
  const handleMarkContacted = async (id) => {
    try {
      await authFetch(`/api/inquiries/${id}`, { method: 'PATCH' });
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle delete inquiry
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await authFetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle update inquiry
  const handleUpdateInquiry = async (id, data) => {
    try {
      await authFetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      loadData();
      setShowEditModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle view details
  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailModal(true);
  };

  // Handle edit
  const handleEdit = (inquiry) => {
    setSelectedInquiry(inquiry);
    setEditData({ ...inquiry });
    setShowEditModal(true);
  };

  // Filter and search inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginate
  const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Prepare chart data
  const pieData = [
    { name: 'Pending', value: stats.pending },
    { name: 'Contacted', value: stats.contacted }
  ].filter(d => d.value > 0);

  // Handle logout
  const goToLogin = () => {
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm h-80"></div>
              <div className="bg-white rounded-xl p-6 shadow-sm h-80"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={loadData}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={goToLogin}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage inquiries and monitor performance</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={loadData}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              Lifetime total
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <AlertCircle className="w-3 h-3 mr-1 text-yellow-500" />
              Need attention
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Contacted</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.contacted}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              {stats.conversionRate}% conversion rate
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Today</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.today}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Live updates
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Service Performance</h3>
                <p className="text-xs text-gray-500">Most viewed services</p>
              </div>
            </div>
            <div className="h-72">
              {summary.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="service_title" 
                      tick={{ fontSize: 11, fill: '#6B7280' }}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="views" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No service data available
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Inquiry Status</h3>
                <p className="text-xs text-gray-500">Distribution of inquiries</p>
              </div>
            </div>
            <div className="h-72">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend 
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
                <p className="text-sm text-gray-500">
                  Showing {paginatedInquiries.length} of {filteredInquiries.length} inquiries
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full sm:w-48 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
                        <p className="text-sm font-medium">No inquiries found</p>
                        <p className="text-xs text-gray-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                            {inq.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900 truncate max-w-[100px]">
                            {inq.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-[120px]">
                        {inq.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell truncate max-w-[120px]">
                        {inq.phone || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell truncate max-w-[120px]">
                        {inq.subject || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell truncate max-w-[150px]">
                        {inq.message}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          inq.status === 'contacted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            inq.status === 'contacted' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></span>
                          {inq.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(inq.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(inq)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {inq.status !== 'contacted' && (
                            <button
                              onClick={() => handleMarkContacted(inq.id)}
                              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mark Contacted"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(inq)}
                            className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredInquiries.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Inquiry Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</label>
                <p className="text-sm font-medium text-gray-900 mt-1">{selectedInquiry.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                <p className="text-sm text-gray-900 mt-1">{selectedInquiry.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</label>
                <p className="text-sm text-gray-900 mt-1">{selectedInquiry.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</label>
                <p className="text-sm text-gray-900 mt-1">{selectedInquiry.subject || 'No subject'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</label>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedInquiry.status === 'contacted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedInquiry.status}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Message</label>
                <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Received</label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              {selectedInquiry.status !== 'contacted' && (
                <button
                  onClick={() => {
                    handleMarkContacted(selectedInquiry.id);
                    setShowDetailModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Mark Contacted
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Inquiry</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={editData.phone || ''}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  value={editData.subject || ''}
                  onChange={(e) => setEditData({...editData, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editData.status || 'pending'}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={editData.message || ''}
                  onChange={(e) => setEditData({...editData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateInquiry(selectedInquiry.id, editData)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;