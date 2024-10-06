import axios from 'axios';

class ApiService {
    constructor(baseURL, deviceGatewayUrl) {
        global.Buffer = require('buffer').Buffer;

        this.baseURL = baseURL;
        this.deviceGatewayUrl = deviceGatewayUrl;

        this.axiousService = axios.create({
            baseURL: this.baseURL
        });

        this.axiousDeviceGatewayService = axios.create({
            baseURL: this.deviceGatewayUrl
        });

        this.debug = true;
    }

    setCredentials(username, password) {
        this.token = undefined;
        this.expires = undefined;
        this.device = undefined;
        this.username = username;
        this.password = password;
    }

    async getToken() {
        if (!this.username || !this.password)
            return;

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

    async getDevice() {
        if (this.device != undefined)
            return this.device;

        try {
            response = await this.get(`/v1/Device/GetDevices?subscriptionId=${this.getSubscription()}`);
            if (response) {
                const device = response.data[0];
                console.log('device: ' + JSON.stringify(device));
                this.device = device;
                return this.device;
            } else {
                console.log(JSON.stringify(response));
                this.device = undefined;
                console.error("Nenhum dispositivo encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar o deviceId:", error);
            return null;
        }
    }

    async getDeviceId() {
        if (this.device == undefined)
            await this.getDevice();

        return this.device.id;
    }

    async getDeviceName() {
        if (this.device == undefined)
            await this.getDevice();

        return this.device.deviceName;
    }

    async getDevicePrimaryKey() {
        if (this.device == undefined)
            await this.getDevice();

        return this.device.devicePrimaryKey;
    }

    async createNewDevice() {
        let subscriptionId = this.getSubscription();
        return await this.axiousDeviceGatewayService.post(`/v1/Provisioning/EnrollDevice?subscriptionId=${subscriptionId}`).catch(error => { this.trataErro(error) })
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

const apiClient = new ApiService('https://dev-seniorconnect-apiserver.azurewebsites.net', 'https://dev-seniorconnect-provisioninggateway.azurewebsites.net');

export default apiClient;