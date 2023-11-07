import React from 'react'
import { toast } from 'react-toastify'

export default function useAlerts() {
    const successMessage = (message = "") => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const errorMessage = (message = "") => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    return {
        success: successMessage,
        error: errorMessage
    }
}
