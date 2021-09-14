using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;

namespace KKN.Core
{
    public class DbHelper
    {
        #region ExecuteReaderAsync
        public static Task<List<T>> ExecuteReaderAsync<T>(string connectionString, CommandType commandType, string query)
        {
            return ExecuteReaderAsync<T>(connectionString, commandType, query, x => { });
        }
        public static async Task<List<T>> ExecuteReaderAsync<T>(string connectionString, CommandType commandType, string query, Action<SqlParameterCollection> parameters)
        {
            List<T> result = new List<T>();
            var objectProperties = typeof(T).GetProperties();
            using (var conection = new SqlConnection(connectionString))
            {
                await conection.OpenAsync();
                using (SqlCommand comm = conection.CreateCommand())
                {
                    comm.CommandType = commandType;
                    comm.CommandText = query;
                    parameters(comm.Parameters);


                    using (var reader = await comm.ExecuteReaderAsync())
                    {
                        var columnSchema = reader.GetColumnSchema().Select(it => it.ColumnName);
                        while (await reader.ReadAsync())
                        {
                            result.Add(reader.MapToObject<T>(columnSchema, objectProperties));
                        }
                    }
                }
            }
            return result;
        }
        public static Task<DataTable> ExecuteReaderAsync(string connectionString, CommandType commandType, string query)
        {
            return ExecuteReaderAsync(connectionString, commandType, query, x => { });
        }
        public static async Task<DataTable> ExecuteReaderAsync(string connectionString, CommandType commandType, string query, Action<SqlParameterCollection> parameters)
        {
            DataTable dataTable = new DataTable();
            using (var conection = new SqlConnection(connectionString))
            {
                await conection.OpenAsync();
                using (SqlCommand comm = conection.CreateCommand())
                {
                    comm.CommandType = commandType;
                    comm.CommandText = query;
                    parameters(comm.Parameters);

                    using (var reader = await comm.ExecuteReaderAsync())
                    {
                        dataTable.Load(reader);
                    }
                }
            }

            return dataTable;
        }
        #endregion

        #region ExecuteReader
        public static List<T> ExecuteReader<T>(string connectionString, CommandType commandType, string query)
        {
            return ExecuteReader<T>(connectionString, commandType, query, x => { });
        }
        public static List<T> ExecuteReader<T>(string connectionString, CommandType commandType, string query, Action<SqlParameterCollection> parameters)
        {

            List<T> result = new List<T>();
            var objectProperties = typeof(T).GetProperties();
            using (var conection = new SqlConnection(connectionString))
            {
                conection.Open();
                using (SqlCommand comm = conection.CreateCommand())
                {
                    comm.CommandType = commandType;
                    comm.CommandText = query;
                    parameters(comm.Parameters);


                    using (var reader = comm.ExecuteReader())
                    {
                        var columnSchema = reader.GetColumnSchema().Select(it => it.ColumnName);
                        while (reader.Read())
                        {
                            result.Add(reader.MapToObject<T>(columnSchema, objectProperties));
                        }
                    }
                }
            }
            //});
            return result;
        }
        public static DataTable ExecuteReader(string connectionString, CommandType commandType, string query)
        {
            return ExecuteReader(connectionString, commandType, query, x => { });
        }
        public static DataTable ExecuteReader(string connectionString, CommandType commandType, string query, Action<SqlParameterCollection> parameters)
        {
            DataTable dataTable = new DataTable();
            using (var conection = new SqlConnection(connectionString))
            {
                conection.Open();
                using (SqlCommand comm = conection.CreateCommand())
                {
                    comm.CommandType = commandType;
                    comm.CommandText = query;
                    parameters(comm.Parameters);

                    using (var reader = comm.ExecuteReader())
                    {
                        dataTable.Load(reader);
                    }
                }
            }

            return dataTable;
        }
        #endregion

        #region ExecuteNoneQueryAsync
        public static Task<int> ExecuteNoneQueryAsync(string connectionString, CommandType commandType, string query)
        {
            return ExecuteNoneQueryAsync(connectionString, commandType, query, x => { });
        }
        public static async Task<int> ExecuteNoneQueryAsync(string connectionString, CommandType commandType, string query, Action<SqlParameterCollection> parameters)
        {
            int result = 0;
            using (var conection = new SqlConnection(connectionString))
            {
                using (SqlCommand comm = conection.CreateCommand())
                {
                    comm.CommandType = commandType;
                    comm.CommandText = query;
                    parameters(comm.Parameters);
                    await conection.OpenAsync();
                    result = await comm.ExecuteNonQueryAsync();
                }
            }
            return result;
        }
        #endregion

        #region ExecuteNoneQuery
        public static int ExecuteNoneQuery(string connectionString, CommandType commandType, string query)
        {
            return ExecuteNoneQuery(connectionString, commandType, query, x => { });
        }
        public static int ExecuteNoneQuery(string connectionString, CommandType commandType, string query, Action<SqlParameterCollection> parameters)
        {
            int result = 0;
            var conection = new SqlConnection(connectionString);
            using (SqlCommand comm = conection.CreateCommand())
            {
                comm.CommandType = commandType;
                comm.CommandText = query;
                parameters(comm.Parameters);
                conection.Open();
                result = comm.ExecuteNonQuery();
            }
            return result;
        }
        #endregion

        #region Query
        public static List<T> Query<T>(string connectionString, string query, object param = null)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                return connection.Query<T>(query, param).ToList();
            }
        }
        #endregion

        #region QueryAsync
        public static async Task<List<T>> QueryAsync<T>(string connectionString, string query, object param = null)
        {
            List<T> result;
            using (var connection = new SqlConnection(connectionString))
            {
                result = (await connection.QueryAsync<T>(query, param)).ToList();
            }
            return result;
        }
        #endregion

        #region BeginTransaction
        public static TransactionScope BeginTransaction()
        {
            TransactionScope trans;// = null;

            TransactionOptions options = new TransactionOptions();
            //options.Timeout = TimeSpan.FromMinutes(15000);
            options.IsolationLevel = System.Transactions.IsolationLevel.Serializable;
            trans = new TransactionScope(TransactionScopeOption.Required, options, TransactionScopeAsyncFlowOption.Enabled);

            return trans;
        }
        #endregion

    }

}
