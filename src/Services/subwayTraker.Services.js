
export default class SubwayTraker {
    constructor() {
        // Define la URL base de tu API en el servidor y en localhost
        this.serverBaseUrl = "https://backend-subway-traker.onrender.com/api/";
        this.localBaseUrl = "http://localhost:9050/api/";

        // Verifica si estamos en localhost
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            // Si es localhost, utiliza la URL local
            this.baseURL = this.localBaseUrl;
            // this.baseURL = this.serverBaseUrl;
        } else {
            // Si no es localhost, utiliza la URL del servidor
            this.baseURL = this.serverBaseUrl;
        }
    }
    async fetchData(endpoint, method, data = null) {
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : null
            };

            const response = await fetch(this.baseURL + endpoint, options);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener datos', error);
            return null;
        }
    }
    async getSubwayStatus() {
        try {
            const response = this.fetchData("subway-status", "GET");
            return response
        } catch (error) {
            console.error('error', error);
        }
    }
    async getSubwayInformation() {
        try {
            const response = this.fetchData("subway-information", "GET");
            return response
        } catch (error) {
            console.error('error', error);
        }
    }
    async getSubwayPrices() {
        try {
            const response = this.fetchData("subway-prices", "GET");
            return response
        } catch (error) {
            console.error('error', error);
        }
    }
    async getUpdateSubwayPrices() {
        try {
            const response = this.fetchData("update-scraped-data", "GET");
            return response
        } catch (error) {
            console.error('error', error);
        }
    }
}