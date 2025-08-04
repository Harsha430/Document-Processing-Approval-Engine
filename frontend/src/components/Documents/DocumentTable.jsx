import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Calendar, 
  User,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const DocumentTable = ({ documents }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="w-4 h-4 text-success-600" />
      case 'REJECTED':
        return <XCircle className="w-4 h-4 text-danger-600" />
      default:
        return <Clock className="w-4 h-4 text-warning-600" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'status-approved'
      case 'REJECTED':
        return 'status-rejected'
      case 'PENDING':
        return 'status-pending'
      default:
        return 'status-under-review'
    }
  }

  const getProgressPercentage = (document) => {
    // Use the progressPercentage from the backend if available
    if (document.progressPercentage !== undefined) {
      return document.progressPercentage
    }

    // Fallback calculation
    switch (document.status) {
      case 'APPROVED':
        return 100
      case 'REJECTED':
        return 100
      case 'PENDING':
        return 33
      default:
        return 0
    }
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((document, index) => (
              <motion.tr
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Document */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {document.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {document.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(document.status)}
                    <span className={`${getStatusBadge(document.status)} text-xs`}>
                      {document.status}
                    </span>
                  </div>
                </td>

                {/* Progress */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">
                        {document.status === 'PENDING' ? 'In Review' : 
                         document.status === 'APPROVED' ? 'Completed' :
                         document.status === 'REJECTED' ? 'Rejected' : 'Unknown'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getProgressPercentage(document)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(document)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-1.5 rounded-full ${
                          document.status === 'APPROVED' ? 'bg-success-500' :
                          document.status === 'REJECTED' ? 'bg-danger-500' :
                          'bg-warning-500'
                        }`}
                      />
                    </div>
                  </div>
                </td>

                {/* Uploaded Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {document.createdAt ? 
                      format(new Date(document.createdAt), 'MMM dd, yyyy') : 
                      'Unknown'
                    }
                  </div>
                </td>

                {/* Uploaded By */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    {document.uploadedBy || 'Unknown'}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/documents/${document.id}`}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    <button
                      className="p-2 text-gray-400 hover:text-success-600 hover:bg-success-50 rounded-lg transition-all duration-200"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    
                    <button
                      className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DocumentTable
