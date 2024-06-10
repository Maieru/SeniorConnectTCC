using Microsoft.Azure.Devices;
using Newtonsoft.Json;
using System.Text;

namespace Teste_Envio_Msgs_C2D
{
    public partial class frMain : Form
    {
        private const string SERVICE_CONNECTION_STRING = "HostName=testecourse-iot.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=/2GQ5Xrfj0wISr+6dxH9z1ivlVV5/I319AIoTMCmj3Q=";
        private const string TARGET_DEVICE = "device-teste";

        public frMain()
        {
            InitializeComponent();
        }

        private async void btnLigarLED_Click(object sender, EventArgs e)
        {
            var configuracao = new { LedLigado = true };
            var json = JsonConvert.SerializeObject(configuracao);

            await SendCloudToDeviceMessageAsync(json);
        }

        private async void btnDesligarLED_Click(object sender, EventArgs e)
        {
            var configuracao = new { LedLigado = false };
            var json = JsonConvert.SerializeObject(configuracao);

            await SendCloudToDeviceMessageAsync(json);
        }

        private async static Task SendCloudToDeviceMessageAsync(string message)
        {
            ServiceClient serviceClient = ServiceClient.CreateFromConnectionString(SERVICE_CONNECTION_STRING);
            string targetDevice = TARGET_DEVICE;
            var commandMessage = new Microsoft.Azure.Devices.Message(Encoding.ASCII.GetBytes(message));
            await serviceClient.SendAsync(targetDevice, commandMessage);
        }
    }
}
