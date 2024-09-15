import axios from 'axios';

class ApiService {
    constructor(baseURL) {
        global.Buffer = require('buffer').Buffer;
        this.baseURL = baseURL;
        this.axiousService = axios.create({
            baseURL: this.baseURL
        });
        console.log(this.axiosService);
    }

    setCredentials(username, password) {
        this.token = undefined;
        this.expires = undefined;
        this.username = username;
        this.password = password;
    }

    async getToken() {
        if (!this.username || !this.password) {
            return;
        }

        if (!this.token || new Date() > new Date(this.expires)) {
            await this.axiousService.get('/v1/User/GetToken', {
                params: {
                    username: this.username,
                    password: this.password
                }
            }).then(response => {
                this.token = response.data.token;
                this.expires = response.data.expiration;
                this.subscription = 3;
                this.setSubscription(this.token);
            }).catch(error => {
                console.log(error);
            });
        }

        return this.token;
    }

    setSubscription(jwtToken) {
        var tokenObject = JSON.parse(Buffer.from(jwtToken.split('.')[1], 'base64').toString())
        this.subscription = tokenObject.subscription;
    }

    getSubscription() {
        return this.subscription;
    }

    getTokenConfiguration(token) {
        return {
            headers: { Authorization: `Bearer ${token}` }
        }
    }

    async get(url, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.get(url, this.getTokenConfiguration(token));
        }

        return await this.axiousService.get(url);
    }

    async post(url, data, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.post(url, data, this.getTokenConfiguration(token));
        }

        return await this.axiousService.post(url, data);
    }


    async delete(url, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.delete(url, this.getTokenConfiguration(token));
        }

        return await this.axiousService.delete(url);
    }

    async put(url, data, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.put(url, data, this.getTokenConfiguration(token));
        }

        return await this.axiousService.put(url, data);
    }
}

const apiClient = new ApiService('https://dev-seniorconnect-apiserver.azurewebsites.net');

export default apiClient;