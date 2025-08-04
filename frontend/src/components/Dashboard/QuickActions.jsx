import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Upload, 
  FileText, 
  GitBranch, 
  Users, 
  ClipboardList,
  Plus,
  ArrowRight
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const QuickActions = () => {
  const { canReview, canManageUsers, canViewAuditLogs } = useAuthStore()

  const actions = [
    {
      title: 'Upload Document',
      description: 'Submit a new document for review',
      icon: Upload,
      href: '/documents/upload',
      color: 'primary',
      show: true
    },
    {
      title: 'My Documents',
      description: 'View all your documents',
      icon: FileText,
      href: '/documents',
      color: 'success',
      show: true
    },
    {
      title: 'Review Workflows',
      description: 'Review pending documents',
      icon: GitBranch,
      href: '/workflows',
      color: 'warning',
      show: canReview()
    },
    {
      title: 'Manage Users',
      description: 'User management and roles',
      icon: Users,
      href: '/users',
      color: 'danger',
      show: canManageUsers()
    },
    {
      title: 'Audit Logs',
      description: 'View system activity logs',
      icon: ClipboardList,
      href: '/audit-logs',
      color: 'primary',
      show: canViewAuditLogs()
    }
  ]

  const visibleActions = actions.filter(action => action.show)

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50 hover:bg-primary-100',
        icon: 'text-primary-600',
        border: 'border-primary-200 hover:border-primary-300'
      },
      success: {
        bg: 'bg-success-50 hover:bg-success-100',
        icon: 'text-success-600',
        border: 'border-success-200 hover:border-success-300'
      },
      warning: {
        bg: 'bg-warning-50 hover:bg-warning-100',
        icon: 'text-warning-600',
        border: 'border-warning-200 hover:border-warning-300'
      },
      danger: {
        bg: 'bg-danger-50 hover:bg-danger-100',
        icon: 'text-danger-600',
        border: 'border-danger-200 hover:border-danger-300'
      }
    }
    return colors[color] || colors.primary
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
        </div>
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary-600" />
        </div>
      </div>

      <div className="space-y-3">
        {visibleActions.map((action, index) => {
          const Icon = action.icon
          const colorClasses = getColorClasses(action.color)
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={action.href}
                className={`group block p-4 rounded-xl border-2 transition-all duration-300 ${colorClasses.bg} ${colorClasses.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses.bg}`}>
                      <Icon className={`w-5 h-5 ${colorClasses.icon}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 group-hover:text-gray-500 transition-colors duration-200">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className={`w-5 h-5 ${colorClasses.icon}`} />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-6 border-t border-gray-200"
      >
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-4 h-4 text-primary-700" />
            </div>
            <div>
              <h4 className="font-semibold text-primary-900 mb-1">Need Help?</h4>
              <p className="text-sm text-primary-700 mb-2">
                Check out our documentation or contact support for assistance.
              </p>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200">
                View Documentation →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default QuickActions
