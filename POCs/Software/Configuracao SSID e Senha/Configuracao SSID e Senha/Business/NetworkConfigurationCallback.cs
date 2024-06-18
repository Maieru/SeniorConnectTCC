using Android.Net;
using Android.Runtime;
using Configuracao_SSID_e_Senha.ViewModels;
using Java.Net;
using Java.Security.Cert;
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

        public NetworkConfigurationCallback(ConfiguracaoWifi configuracaoWifi)
        {
            ConfiguracoesSelecionadas = configuracaoWifi;
        }

        public override void OnAvailable(Network network)
        {
            base.OnAvailable(network);

            var androidNetwork = network.JavaCast<Network>();
            var url = new URL("http://192.168.4.1");
            var urlConnection = androidNetwork.OpenConnection(url);

            try
            {
                if (urlConnection is HttpURLConnection httpUrlConnection)
                {
                    httpUrlConnection.RequestMethod = "POST";
                    httpUrlConnection.DoOutput = true; // Permite escrita de conteúdo no corpo da requisição

                    // Adicionando cabeçalhos se necessário, por exemplo:
                    // httpUrlConnection.SetRequestProperty("Content-Type", "application/x-www-form-urlencoded");

                    var postData = Encoding.UTF8.GetBytes($"ssid={ConfiguracoesSelecionadas.SSID}&password={ConfiguracoesSelecionadas.Password}");

                    using (var outputStream = httpUrlConnection.OutputStream)
                    {
                        outputStream.Write(postData, 0, postData.Length);
                    }

                    // Verificando a resposta
                    var responseCode = httpUrlConnection.ResponseCode;
                }
            }
            finally
            {
                // Fechando a conexão se necessário
                if (urlConnection is HttpURLConnection httpUrlConnection)
                {
                    httpUrlConnection.Disconnect();
                }
            }
        }
    }
#endif
}