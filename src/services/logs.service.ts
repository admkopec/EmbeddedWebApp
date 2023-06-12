export interface Log {
    timestamp: string; // id of the log
    action: string;
    description: string;
    image?: string;
}

export const fetchLogs = () =>
    fetch('/api/logs', {
        method: `GET`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    });