using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKN.Core
{
    public class ExceptionHelper
    {

        //public static void DoFailed(params string[] pMessages)
        //{
        //    code = HttpStatusCode.BadRequest.GetHashCode();
        //    isSuccess = false;
        //    messages.AddRange(pMessages);
        //}

        //public static void DoFailed(int pCode, params string[] pMessages)
        //{
        //    code = pCode;
        //    isSuccess = false;
        //    messages.AddRange(pMessages);
        //}

        //public static void DoError(Exception ex, int? _errorLogId = null)
        //{
        //    code = HttpStatusCode.InternalServerError.GetHashCode();
        //    isSuccess = false;
        //    messages.Add("Message: " + ex.Message);
        //    messages.Add("ExceptionType: " + ex.GetType().ToString());
        //    messages.Add("StackTrace" + ex.StackTrace);

        //    Exception innerException = ex.InnerException;
        //    while (innerException != null)
        //    {
        //        messages.Add("******************************");
        //        messages.Add("Message: " + innerException.Message);
        //        messages.Add("ExceptionType: " + innerException.GetType().ToString());
        //        messages.Add("StackTrace" + innerException.StackTrace);
        //        innerException = innerException.InnerException;
        //    }

        //    if (_errorLogId != null)
        //    {
        //        errorLogId = _errorLogId.Value;
        //    }
        //}

        //public static void DoBadRequest(string messageBadRequest)
        //{
        //    code = (int)HttpStatusCode.BadRequest;
        //    isSuccess = false;
        //    messages.Add(messageBadRequest);
        //}
    }
}
