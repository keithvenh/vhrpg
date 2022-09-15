import React, { useState, useMemo, createContext } from 'react'

export const pagesMapping = {
    missionControl: 'missionControl',
    campaigns: 'campaigns',
    newCampaign: 'newCampaign'
}

export const RoutingContext = createContext({ page: pagesMapping.missionControl })

export default function Router({ children }) {
    let urlPath = window.location.pathname.slice(1).toLowerCase()

    const [page, setPage] = useState(urlPath || pagesMapping.missionControl)

    const value = useMemo( () => ({
            page, setPage
        }),[page,setPage]
    )

    return (
        <RoutingContext.Provider value={value}>
            {children}
        </RoutingContext.Provider>
    )
}