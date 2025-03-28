using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class MouseHub : Hub
{
    public async Task SendMousePosition(string username, int x, int y)
    {
        // Envia para todos os clientes conectados, exceto o remetente
        await Clients.Others.SendAsync("ReceiveMousePosition", username, x, y);
    }
}
