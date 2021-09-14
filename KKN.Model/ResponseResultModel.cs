using System;
using System.Collections.Generic;
using System.Net;

namespace KKN.Model
{
    public class ResponseResultModel
    {
        public List<string> Messages { get; set; } = new List<string>();
        public int StatusCode { get; set; }
        //public int ErrorLogId { get; set; }
        public bool IsSuccess { get; set; }

        public void AddMessage(IEnumerable<string> pMessages)
        {
            Messages.AddRange(pMessages);
        }

        public void DoFailed(params string[] pMessages)
        {
            StatusCode = HttpStatusCode.BadRequest.GetHashCode();
            IsSuccess = false;
            Messages.AddRange(pMessages);
        }

        public void DoFailed(int pCode, params string[] pMessages)
        {
            StatusCode = pCode;
            IsSuccess = false;
            Messages.AddRange(pMessages);
        }

        public void DoError(Exception ex, int? _errorLogId = null)
        {
            StatusCode = HttpStatusCode.InternalServerError.GetHashCode();
            IsSuccess = false;
            Messages.Add("Message: " + ex.Message);
            Messages.Add("ExceptionType: " + ex.GetType().ToString());
            Messages.Add("StackTrace" + ex.StackTrace);

            Exception innerException = ex.InnerException;
            while (innerException != null)
            {
                Messages.Add("******************************");
                Messages.Add("Message: " + innerException.Message);
                Messages.Add("ExceptionType: " + innerException.GetType().ToString());
                Messages.Add("StackTrace" + innerException.StackTrace);
                innerException = innerException.InnerException;
            }

            //if (_errorLogId != null)
            //{
            //    errorLogId = _errorLogId.Value;
            //}
        }

        public void DoBadRequest(string messageBadRequest)
        {
            StatusCode = (int)HttpStatusCode.BadRequest;
            IsSuccess = false;
            Messages.Add(messageBadRequest);
        }
    }

}
