using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace InfoDisplay.WebApp.Hubs
{
    public class InfoHub : Hub
    {
        public void PushMessage(string message)
        {
            Clients.All.incomingMessage(message);
        }

        public void PushColor(int value)
        {
            string color = "white";

            if (value > 1000 && value < 2000)
            {
                color = "red";
            }
            else if (value > 2000 && value < 3000)
            {
                color = "green";
            }
            else if(value > 3000)
            {
                color = "blue";
            }

            Clients.All.incomingColor(color);
        }
    }
}
