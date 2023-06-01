export interface Actuators {
    light: number,
    bar: number
}

export const fetchActuators = () =>
    fetch("/actuators",{
        method: `GET`,
            headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    });

export const setActuators = (actuators: Actuators) =>
    fetch("/actuators",{
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(actuators)
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response;
    });