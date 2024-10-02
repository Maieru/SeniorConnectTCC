import axios from 'axios';

class ApiService {
    constructor(baseURL) {
        global.Buffer = require('buffer').Buffer;

        this.baseURL = baseURL;
        this.axiousService = axios.create({
            baseURL: this.baseURL
        });

        this.debug = false;
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
                this.setSubscription(this.token);
            }).catch(error => { this.trataErro(error) });
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

    async getDevice(){
        try {
            response = await apiClient.get(`/v1/Device/GetDevices?subscriptionId=${this.getSubscription()}`);
            if (response) {
                const deviceId = response.data[0].id;
                console.log('device id: ' + deviceId);
                return deviceId;
            } else {
                console.log(JSON.stringify(response));
                console.error("Nenhum dispositivo encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar o deviceId:", error);
            return null;
        }
    }

    getTokenConfiguration(token) {
        return {
            headers: { Authorization: `Bearer ${token}` }
        }
    }

    async get(url, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.get(url, this.getTokenConfiguration(token)).catch(error => { this.trataErro(error) });
        }

        return await this.axiousService.get(url);
    }

    async post(url, data, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.post(url, data, this.getTokenConfiguration(token)).catch(error => { this.trataErro(error) });
        }

        return await this.axiousService.post(url, data);
    }

    async delete(url, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.delete(url, this.getTokenConfiguration(token)).catch(error => { this.trataErro(error) });
        }

        return await this.axiousService.delete(url);
    }

    async put(url, data, anonymous = false) {
        if (!anonymous) {
            let token = await this.getToken();
            return await this.axiousService.put(url, data, this.getTokenConfiguration(token)).catch(error => { this.trataErro(error) });
        }

        return await this.axiousService.put(url, data);
    }

    trataErro(erro) {
        var mensagemErro = ''
        mensagemErro += erro.toString();

        if (erro.response)
            mensagemErro += ' - ' + erro.response.data;

        if (this.debug && erro.request)
            mensagemErro += ' ---- Detalhes da Requisição ---- ' + JSON.stringify(erro.request);

        console.log(mensagemErro);
    }
}

const apiClient = new ApiService('https://dev-seniorconnect-apiserver.azurewebsites.net');

export default apiClient;