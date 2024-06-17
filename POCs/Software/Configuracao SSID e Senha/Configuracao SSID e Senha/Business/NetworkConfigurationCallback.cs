using Android.Net;
using Configuracao_SSID_e_Senha.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Configuracao_SSID_e_Senha.Business
{
#if ANDROID
    internal class NetworkConfigurationCallback : ConnectivityManager.NetworkCallback
    {
        private ConfiguracaoWifi ConfiguracoesSelecionadas { get; set; }
        public EventHandler OnSendConfigurationSuccess { get; set; }
        public EventHandler OnSendConfigurationFail { get; set; }


        public NetworkConfigurationCallback(ConfiguracaoWifi configuracaoWifi)
        {
            ConfiguracoesSelecionadas = configuracaoWifi;
        }

        public override void OnAvailable(Network network)
        {
            try
            {
                var client = new HttpClient();

                var formContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("ssid", ConfiguracoesSelecionadas.SSID),
                    new KeyValuePair<string, string>("pass", ConfiguracoesSelecionadas.Password)
                });

                var response = client.PostAsync("http://192.168.4.1", formContent).Result;

                if (response.IsSuccessStatusCode)
                    OnSendConfigurationSuccess?.Invoke(this, null);
                else
                    OnSendConfigurationFail?.Invoke(this, null);
            }
            catch (Exception erro)
            {
                OnSendConfigurationFail?.Invoke(this, null);
            }
        }
    }
#endif
}