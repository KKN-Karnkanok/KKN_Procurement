using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;

namespace KKN
{
    public static class Extension
    {
        #region SqlDataReader MapToObject
        public static T MapToObject<T>(this SqlDataReader reader, IEnumerable<string> readerColumnSchema, IEnumerable<PropertyInfo> objectColumnProp)
        {
            T model = Activator.CreateInstance<T>();
            try
            {
                foreach (var prop in objectColumnProp)
                {
                    if (readerColumnSchema.Contains(prop.Name))
                    {
                        if (!reader.IsDBNull(prop.Name))
                        {
                            object val;
                            if (prop.PropertyType == typeof(DateTime?))
                            {
                                val = reader[prop.Name];
                            }
                            else
                            {
                                val = Convert.ChangeType(reader[prop.Name], prop.PropertyType);
                            }
                            //var val = Convert.ChangeType(reader[prop.Name], prop.PropertyType);
                            prop.SetValue(model, val);
                        }
                        else
                        {
                            prop.SetValue(model, null);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }


            return model;
        }
        #endregion

        #region DataTable ConvertToList
        private static List<T> ConvertToList<T>(this DataTable dt)
        {
            List<T> result = new List<T>();
            IEnumerable<PropertyInfo> columnProperty = typeof(T).GetProperties().Where(it => it.PropertyType.Name != "ICollection`1" && dt.Columns.Contains(it.Name));

            foreach (DataRow dr in dt.Rows)
            {
                T model = Activator.CreateInstance<T>();

                foreach (PropertyInfo prop in columnProperty)
                {
                    if (!dr.IsNull(prop.Name))
                    {
                        if (prop.PropertyType.Name == "String")
                        {
                            bool isUnchange = dr.RowState == DataRowState.Unchanged;
                            dr[prop.Name] = dr[prop.Name].ToString().Trim();
                            if (isUnchange) dr.AcceptChanges();
                        }
                        if (prop.PropertyType.Name.Equals(dr[prop.Name].GetType().Name))
                        {
                            prop.SetValue(model, dr[prop.Name]);
                        }
                        else
                        {
                            //GetColumnTypeSetValue(model, prop, prop.PropertyType.Name, dr);
                        }
                    }
                }
                result.Add(model);

            }
            return result;
        }
        #endregion

        #region GetDbConnection
        public static string GetDbConnection(this IConfiguration configuration, string name)
        {
            string path = configuration.GetSection("PathDbConfig").Value;

            var appSetting = JsonSerializer.Deserialize<AppSettings>(File.ReadAllText(path));
            return appSetting.ConnectionStrings.GetValueOrDefault(name);
        }
        internal class AppSettings
        {
            public Dictionary<string, string> ConnectionStrings { get; set; }
        }
        #endregion
    }
}
