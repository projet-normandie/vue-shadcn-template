import { toast } from 'vue-sonner'

/**
 * Toast notification interface
 */
export interface Toast {
    id?: string
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
    title: string
    description?: string
    autoClose?: boolean
    duration?: number
}

/**
 * Toast notification service using Sonner
 * Provides functionality to show different types of notifications
 */
export const useToastService = () => {
    /**
     * Convert our options to Sonner options
     */
    const getOptions = (toast: Partial<Toast>) => {
        return {
            description: toast.description,
            duration: toast.duration || 5000,
            // You can add more custom options here
        }
    }

    /**
     * Show a toast notification
     * @param toastData Toast configuration
     * @returns The ID of the created toast
     */
    const showToast = (toastData: Toast) => {
        const options = getOptions(toastData)

        // Default toast
        return toast(toastData.title, options)
    }

    /**
     * Show a success toast notification
     * @param title Toast title
     * @param description Optional description
     * @param options Additional toast options
     * @returns The ID of the created toast
     */
    const success = (title: string, description?: string, options?: Partial<Toast>) => {
        const toastOptions = getOptions({ description, ...options })
        return toast.success(title, toastOptions)
    }

    /**
     * Show an error toast notification
     * @param title Toast title
     * @param description Optional description
     * @param options Additional toast options
     * @returns The ID of the created toast
     */
    const error = (title: string, description?: string, options?: Partial<Toast>) => {
        const toastOptions = getOptions({ description, ...options })
        return toast.error(title, toastOptions)
    }

    /**
     * Show a warning toast notification
     * @param title Toast title
     * @param description Optional description
     * @param options Additional toast options
     * @returns The ID of the created toast
     */
    const warning = (title: string, description?: string, options?: Partial<Toast>) => {
        const toastOptions = getOptions({ description, ...options })
        return toast.warning(title, toastOptions)
    }

    /**
     * Show an info toast notification
     * @param title Toast title
     * @param description Optional description
     * @param options Additional toast options
     * @returns The ID of the created toast
     */
    const info = (title: string, description?: string, options?: Partial<Toast>) => {
        const toastOptions = getOptions({ description, ...options })
        return toast.info(title, toastOptions)
    }

    /**
     * Close a specific toast notification
     * @param id The ID of the toast to close
     */
    const closeToast = (id: string) => {
        toast.dismiss(id)
    }

    /**
     * Close all active toast notifications
     */
    const clearToasts = () => {
        toast.dismiss()
    }

    return {
        showToast,
        success,
        error,
        warning,
        info,
        closeToast,
        clearToasts
    }
}

// Export a default instance
export default useToastService()