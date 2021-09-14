using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KKN
{
    public class JwtHelper
    {
        //– iss(issuer) : เว็บหรือบริษัทเจ้าของ token
        //– sub(subject) : subject ของ token
        //– aud(audience) : ผู้รับ token
        //– exp(expiration time) : เวลาหมดอายุของ token
        //– nbf(not before) : เป็นเวลาที่บอกว่า token จะเริ่มใช้งานได้เมื่อไหร่
        //– iat(issued at) : ใช้เก็บเวลาที่ token นี้เกิดปัญหา
        //– jti(JWT id) : เอาไว้เก็บไอดีของ JWT แต่ละตัว

        public static string SecretKey { get; set; } = "461EEF13-B600-4691-8BA5-C8899C684BA8";

        private static int lifeTimeMinute = 1;
        private static string ISS = "KKN.API";
        private static string AUD = "KKN.Client";


        #region GetTokenString
        private static string GetTokenString(string bearerToken)
        {
            if (!string.IsNullOrEmpty(bearerToken))
            {
                string token = bearerToken.StartsWith("Bearer ") ? bearerToken.Substring(7) : bearerToken;
                return token == "null" ? "" : token;
            }
            else { return ""; }
        }
        #endregion

        #region RetrieveToken
        public static string RetrieveToken(HttpRequest request)
        {
            if (request != null && request.Headers.ContainsKey("Authorization"))
            {
                return GetTokenString(request.Headers["Authorization"]);
            }
            else
            {
                return "";
            }
        }
        #endregion

        #region ReadJwtPayLoad
        public static JwtPayload ReadJwtPayLoad(HttpRequest request)
        {
            string token = RetrieveToken(request);
            if (!string.IsNullOrEmpty(token))
            {
                var handler = new JwtSecurityTokenHandler();
                return handler.ReadJwtToken(token).Payload;
            }
            else
                return new JwtPayload();
        }
        #endregion

        #region GenToken
        //public static string GenToken<T>(List<T> authorizationMenuDTs, long userID, string userName, string passWord, string dbProfile
        //    , bool isRemember, long langID, string culturesCode, string langName, DateTime systemDate, long empID, string empCode, string empName, string empImage, string empPrefix, string email
        //    , long depID, string depCode, string depName, long reponsID, string responsCode, string responsName
        //    , bool isAllBuyer, bool isAllInvOrg, bool isAllSalesp, bool isAllComp, long orgID, string orgCode
        //    , string orgCurrentName, string orgName, string orgPrefix, long branchID, string branchCode, string branchName)
        public static string CreateToken(string userName)
        {
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expires = DateTime.UtcNow.AddMinutes(lifeTimeMinute);//.AddDays(1);
                                                                          // expires ยกเลิกไม่ใช้แล้ว

            var tokenHandler = new JwtSecurityTokenHandler();

            var claimsIdentity = new ClaimsIdentity(new[]
            {
                //new Claim(KKNClaimTypes.UserID, JsonConvert.SerializeObject(userID)),
                new Claim(KKNClaimTypes.UserName, userName.ToLower()),
                //new Claim(KKNClaimTypes.PassWord, passWord),  // passWord จะถูกเข้ารหัสตั้งแต่ PreLogin
                //new Claim(KKNClaimTypes.DBProfile, dbProfile),
                //new Claim(KKNClaimTypes.IsRemember, JsonConvert.SerializeObject(isRemember)),
                //new Claim(KKNClaimTypes.LangID, JsonConvert.SerializeObject(langID)),
                //new Claim(KKNClaimTypes.CulturesCode, culturesCode),
                //new Claim(KKNClaimTypes.LangName, langName),
                //new Claim(KKNClaimTypes.SystemDate, JsonConvert.SerializeObject(systemDate)),
                //new Claim(KKNClaimTypes.EmpID, JsonConvert.SerializeObject(empID)),
                //new Claim(KKNClaimTypes.EmpCode, empCode ?? ""),
                //new Claim(KKNClaimTypes.EmpName, empName ?? ""),
                ////new Claim(KKNClaimTypes.EmpImage, empImage),
                //new Claim(KKNClaimTypes.EmpPrefix, empPrefix ?? ""),
                //new Claim(KKNClaimTypes.Email, email ?? ""),
                //new Claim(KKNClaimTypes.DepID, JsonConvert.SerializeObject(depID)),
                //new Claim(KKNClaimTypes.DepCode, depCode ?? ""),
                //new Claim(KKNClaimTypes.DepName, depName ?? ""),
                //new Claim(KKNClaimTypes.ResponsID, JsonConvert.SerializeObject(reponsID)),
                //new Claim(KKNClaimTypes.ResponsCode, responsCode ?? ""),
                //new Claim(KKNClaimTypes.ResponsName, responsName ?? ""),
                //new Claim(KKNClaimTypes.IsAllBuyer, JsonConvert.SerializeObject(isAllBuyer)),
                //new Claim(KKNClaimTypes.IsAllInvOrg, JsonConvert.SerializeObject(isAllInvOrg)),
                //new Claim(KKNClaimTypes.IsAllSalesp, JsonConvert.SerializeObject(isAllSalesp)),
                //new Claim(KKNClaimTypes.IsAllComp, JsonConvert.SerializeObject(isAllComp)),
                //new Claim(KKNClaimTypes.OrgID, JsonConvert.SerializeObject(orgID)),
                //new Claim(KKNClaimTypes.OrgCode, orgCode ?? ""),
                //new Claim(KKNClaimTypes.OrgCurrentName, orgCurrentName ?? ""),
                //new Claim(KKNClaimTypes.OrgName, orgName ?? ""),
                //new Claim(KKNClaimTypes.OrgPrefix, orgPrefix ?? ""),
                //new Claim(KKNClaimTypes.BranchID, JsonConvert.SerializeObject(branchID)),
                //new Claim(KKNClaimTypes.BranchCode, branchCode ?? ""),
                //new Claim(KKNClaimTypes.BranchName, branchName ?? ""),
                ////new Claim(KKNClaimTypes.AuthorizationMenuDTs, JsonConvert.SerializeObject(authorizationMenuDTs)),

            });

            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(SecretKey));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token =
                 tokenHandler.CreateJwtSecurityToken(
                     issuer: ISS,
                     audience: AUD,
                     subject: claimsIdentity,
                     notBefore: issuedAt,
                     expires: expires,
                     signingCredentials: signingCredentials);

            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
        #endregion
    }

    #region KKNClaimTypes
    public static class KKNClaimTypes
    {
        public const string UserID = "uid";
        public const string UserName = "unm";
        public const string PassWord = "pwd";
        public const string DBProfile = "dbpf";
        public const string IsRemember = "isrmb";
        public const string LangID = "lgid";
        public const string CulturesCode = "cltrcd";
        public const string LangName = "lgnm";
        //----------------------------------------
        public const string SystemDate = "sydt";
        public const string EmpID = "emid";
        public const string EmpCode = "emcd";
        public const string EmpName = "emnm";
        //public const string EmpImage = "emimg";
        public const string EmpPrefix = "empfx";
        public const string Email = "eml";
        //----------------------------------------
        public const string DepID = "dpid";
        public const string DepCode = "dpcd";
        public const string DepName = "dpnm";
        //----------------------------------------
        public const string ResponsID = "rspid";
        public const string ResponsCode = "rspcd";
        public const string ResponsName = "rspnm";
        //----------------------------------------
        public const string IsAllBuyer = "isabyr";
        public const string IsAllInvOrg = "isainv";
        public const string IsAllSalesp = "isasp";
        public const string IsAllComp = "isacm";
        //----------------------------------------
        public const string OrgID = "orid";
        public const string OrgCode = "orcd";
        public const string OrgCurrentName = "orcrrnm";
        public const string OrgName = "ornm";
        public const string OrgPrefix = "orpfx";
        public const string BranchID = "brcid";
        public const string BranchCode = "brccd";
        public const string BranchName = "brcnm";
        //----------------------------------------
        public const string AuthorizationMenuDTs = "athrzmnu";
        //public const string AllSystems = "allsys";
        //public const string AllMenus = "allmnu";
        //public const string AllMenusAdmin = "allmnuad";

    }
    #endregion
}
