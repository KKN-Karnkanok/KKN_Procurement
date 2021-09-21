using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKN.Core
{
    public class EventLogHelper
    {
        #region SaveLog
        public static void SaveLog(string logMessage)
        {
            try
            {
                //string appName = "KKN.VP.API";
                //string sLog = "Application";
                //string sEvent = logMessage;
                //sEvent += " Error By --> " + Environment.MachineName.ToString();

                //if (!EventLog.SourceExists(appName))
                //    EventLog.CreateEventSource(appName, sLog);

                //EventLog.WriteEntry(appName, sEvent, EventLogEntryType.Error);
            }
            catch (Exception)
            {
                //MessageBox.Show(ex.Message);
            }
        }
        #endregion
    }
}
