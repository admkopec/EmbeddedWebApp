export interface Plate {
    plate: string;
    expireDate?: string;
}

export const fetchPlates = () =>
    fetch('/api/plate', {
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

export const addPlate = (plates: Plate[]) =>
    fetch('/api/plate', {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(plates)
    }).then(response => {
        if (!response.ok) {
            if (response.status == 400) {
                return response.text().then((text) => {
                    throw new Error(text);
                });
            }
            throw new Error();
        }
        return response.json();
    });

export const deletePlate = (plateID: string) =>
    fetch(`/api/plate/${encodeURIComponent(plateID)}`, {
        method: `DELETE`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response;
    });

export const modifyPlate = (plateID: string, plate: Plate) =>
    fetch(`/api/plate/${encodeURIComponent(plateID)}`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(plate)
    }).then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response;
    });