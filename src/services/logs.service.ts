export interface Log {
    timestamp: string;
    action: string;
    description: string;
    image: string | undefined;
}

export const fetchLogs = () =>
    fetch('/log', {
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