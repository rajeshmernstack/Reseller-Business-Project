import React, { useEffect } from 'react'
export default function AdminLogout() {
    useEffect(() => {
        localStorage.clear();
        window.location.href = "/admin/login"
    }, [])


}