interface ImageJson {
    image: string
}

export const fetchCurrentImage = () =>
    fetch('/api/image', {
        method: `GET`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    }).then((image: ImageJson) => image.image);

export const fetchImage = (imageID: string) =>
    fetch(`/api/image/${imageID}`, {
        method: `GET`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    }).then((image: ImageJson) => image.image);