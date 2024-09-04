import axios from 'axios';

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.axiousService = axios.create({
            baseURL: this.baseURL
        });
    }

    setCredentials(username, password) {
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
            }).catch(error => {
                console.log(error);
            });
        }

        console.log(this.token);
        return this.token;
    }

    getTokenConfiguration(token) {
        return {
            headers: { Authorization: `Bearer ${token}` }
        }
    } 

    async get(url, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await axios.get(url, this.getTokenConfiguration(token));
        }

        return await axios.get(url);
    }

    async post(url, data, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await axios.post(url, data, this.getTokenConfiguration(token));
        }

        return axios.post(url, data);
    }
}

export default new ApiService('https://dev-seniorconnect-apiserver.azurewebsites.net');