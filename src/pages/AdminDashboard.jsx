import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { authFetch } from "../utils/api";

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [inquiriesData, summaryData] = await Promise.all([
        authFetch('/api/inquiries'),
        authFetch('/api/analytics/summary')
      ]);
      setInquiries(inquiriesData.inquiries);
      setSummary(summaryData.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkContacted = async (id) => {
    try {
      await authFetch(`/api/inquiries/${id}`, { method: 'PATCH' });
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await authFetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-12 px-8 max-w-6xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>

        <div className="mb-12">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-[350px] bg-gray-200 rounded-lg"></div>
        </div>

        <div>
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) return <div className="py-16 px-8 text-red-600">Error: {error}</div>;

  return (
    <div className="py-12 px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Most Accessed Services</h2>
        <div className="bg-white border rounded-lg p-6" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service_title" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={80} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="views" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Inquiries ({inquiries.length})</h2>
        <p className="text-xs text-gray-400 mb-2 md:hidden">← Swipe to see more →</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="border-t text-sm">
                  <td className="p-3">{inq.name}</td>
                  <td className="p-3">{inq.email}</td>
                  <td className="p-3 max-w-xs truncate">{inq.message}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      inq.status === 'contacted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(inq.created_at).toLocaleDateString()}</td>
                  <td className="p-3 space-x-2">
                    {inq.status !== 'contacted' && (
                      <button
                        onClick={() => handleMarkContacted(inq.id)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Mark Contacted
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;