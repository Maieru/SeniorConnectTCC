using Android.Content;
using Android.Net;
using Android.Net.Wifi;
using Android.OS;
using Configuracao_SSID_e_Senha.Business;
using Configuracao_SSID_e_Senha.ViewModels;
using System.Net.NetworkInformation;

namespace Configuracao_SSID_e_Senha
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage()
        {
            InitializeComponent();
            BindingContext = new ConfiguracaoWifi();
        }

        private void OnSubmit(object sender, EventArgs e)
        {
            var configuracoesSelecionadas = (ConfiguracaoWifi)BindingContext;

            if (string.IsNullOrEmpty(configuracoesSelecionadas.SSID))
            {
                DisplayAlert("Erro", "SSID não pode ser vazio", "OK").Wait();
                return;
            }

            if (string.IsNullOrEmpty(configuracoesSelecionadas.Password))
            {
                DisplayAlert("Erro", "Senha não pode ser vazia", "OK").Wait();
                return;
            }

#if ANDROID
            var wifiManager = (WifiManager)Android.App.Application.Context.GetSystemService(Context.WifiService);

            if (wifiManager == null)
                return;

            if (Build.VERSION.SdkInt >= BuildVersionCodes.Q)
            {
                var specifier = new WifiNetworkSpecifier.Builder()
                    .SetSsid("SENIOR_CONNECT_DEVICE")
                    .Build();

                var request = new NetworkRequest.Builder()
                    .AddTransportType(TransportType.Wifi)
                    .RemoveCapability(NetCapability.Internet)
                    .SetNetworkSpecifier(specifier)
                    .Build();

                var connectivityManager = (ConnectivityManager)Android.App.Application.Context.GetSystemService(Context.ConnectivityService);

                var networkCallback = new NetworkConfigurationCallback(configuracoesSelecionadas);

                connectivityManager.RequestNetwork(request, networkCallback);

                // Lembre-se de cancelar a solicitação de rede quando a conexão não for mais necessária.
                // connectivityManager.UnregisterNetworkCallback(networkCallback);
            }
            else
            {
                var wifiConfig = new WifiConfiguration
                {
                    Ssid = "SENIOR_CONNECT_DEVICE",
                };

                wifiConfig.AllowedKeyManagement.Set((int)KeyManagementType.None);

                var addNetwork = wifiManager.AddNetwork(wifiConfig);
                var network = wifiManager.ConfiguredNetworks.FirstOrDefault(n => n.Ssid == "SENIOR_CONNECT_DEVICE");

                if (network == null)
                {
                    Console.WriteLine($"Cannot connect to network: {configuracoesSelecionadas.SSID}");
                    return;
                }
            }
#endif
        }

        private async void OnConfiguracaoEnviadaComSucesso(object sender, EventArgs e)
        {
            await DisplayAlert("Sucesso", "Configuração realizada com sucesso", "OK");
        }

        private async void OnConfiguracaoFalhou(object sender, EventArgs e)
        {
            await DisplayAlert("Erro", "Erro ao configurar", "OK");
        }
    }
}
