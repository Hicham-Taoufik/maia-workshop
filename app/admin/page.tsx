'use client';

import { useEffect, useState } from 'react';
import { Registration } from '@/types/registration';
import { FiDownload, FiRefreshCw, FiSearch, FiMail, FiPhone, FiUser, FiLogOut, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const router = useRouter();

  const csvEscape = (value: unknown) => {
    const s = value === null || value === undefined ? '' : String(value);
    // CSV escaping: wrap in quotes and double any quotes.
    return `"${s.replace(/"/g, '""')}"`;
  };

  const csvPhone = (phone: string) => {
    // Excel often treats values starting with + as formulas; prefix with tab to force text.
    return `\t${phone}`;
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/registrations');
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/api/registrations/delete?id=${id}`, {
        method: 'DELETE',
        credentials: 'include', // Ensure cookies are sent
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log out and log back in to refresh your session.');
        }
        throw new Error(errorData.error || 'Failed to delete registration');
      }

      // Refresh the list
      await fetchRegistrations();
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Failed to delete registration. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL registrations. Are you absolutely sure?')) {
      setShowDeleteAllConfirm(false);
      return;
    }

    setDeleting('all');
    try {
      const response = await fetch('/api/registrations/delete?id=all', {
        method: 'DELETE',
        credentials: 'include', // Ensure cookies are sent
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log out and log back in to refresh your session.');
        }
        throw new Error(errorData.error || 'Failed to delete all registrations');
      }

      const data = await response.json();
      alert(`Successfully deleted ${data.deletedCount} registration(s)`);
      
      // Refresh the list
      await fetchRegistrations();
      setShowDeleteAllConfirm(false);
    } catch (error) {
      console.error('Error deleting all registrations:', error);
      alert('Failed to delete registrations. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Organization/Company',
      'Job Title/Role and Degree',
      'Questions/Comments',
      'Registration Date'
    ];

    const rows = filteredRegistrations.map(reg => [
      reg.fullName,
      reg.email,
      csvPhone(reg.phone),
      reg.organization || '',
      reg.jobTitleDegree || '',
      reg.questions || '',
      new Date(reg.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(csvEscape).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `workshop-registrations-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter(reg => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      reg.fullName.toLowerCase().includes(term) ||
      reg.email.toLowerCase().includes(term) ||
      (reg.organization && reg.organization.toLowerCase().includes(term)) ||
      (reg.jobTitleDegree && reg.jobTitleDegree.toLowerCase().includes(term)) ||
      (reg.questions && reg.questions.toLowerCase().includes(term));
    
    return matchesSearch;
  });

  const stats = {
    total: registrations.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-4xl text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage workshop registrations</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-colors border border-neutral-300"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Registrations</h3>
            <p className="text-3xl font-bold text-primary-600">{stats.total}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, organization, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={fetchRegistrations}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <FiRefreshCw />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <FiDownload />
              Export CSV
            </button>
            {registrations.length > 0 && (
              <button
                onClick={() => setShowDeleteAllConfirm(true)}
                disabled={deleting === 'all'}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiTrash2 />
                {deleting === 'all' ? 'Deleting...' : 'Delete All'}
              </button>
            )}
          </div>
        </div>

        {/* Delete All Confirmation Modal */}
        {showDeleteAllConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FiAlertTriangle className="text-red-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Delete All Registrations?</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                You are about to delete <strong>all {registrations.length} registration(s)</strong>. This will permanently remove all data from the database.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAll}
                  disabled={deleting === 'all'}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === 'all' ? 'Deleting...' : 'Yes, Delete All'}
                </button>
                <button
                  onClick={() => setShowDeleteAllConfirm(false)}
                  disabled={deleting === 'all'}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization/Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title/Role and Degree
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions/Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiUser className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {reg.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <FiMail className="text-gray-400" />
                          {reg.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FiPhone className="text-gray-400" />
                          {reg.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {reg.organization || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {reg.jobTitleDegree || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md whitespace-pre-wrap break-words">
                          {reg.questions?.trim() ? reg.questions : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(reg.id)}
                          disabled={deleting === reg.id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          title="Delete registration"
                        >
                          <FiTrash2 />
                          {deleting === reg.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRegistrations.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRegistrations.length} of {registrations.length} registrations
          </div>
        )}
      </div>
    </div>
  );
}

