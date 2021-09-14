using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using KKN.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using KKN.Core;

namespace KKN.VP.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddSingleton(Configuration);
            //services.Configure<AppSettings>(Configuration);

            services.AddControllers();
            services.AddControllers()
                .AddNewtonsoftJson(options => // AddNewtonsoftJson เพื่อให้ใช้ JObject และ SerializeObject DataTable ให้ return กลับไป cleint ได้
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; // แก้ Return Json แล้ว Error Loop
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver(); // แก้ Return Json แล้วโดนเปลี่ยนอักษรขึ้นต้นเป็น Lower Case
                }).AddXmlDataContractSerializerFormatters();

            
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin", builder =>
                {
                    //builder.WithOrigins("http://localhost:4200");
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();

                });
            });
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                //options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    //IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                    //    .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                        .GetBytes(JwtHelper.SecretKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                };
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        //JwtHelper.SecurityToken = context.SecurityToken;
                        //JwtHelper.HeaderToken = context.Request.Headers["Authorization"].ToString();
                        //JwtHelper.Request = context.Request;
                        return System.Threading.Tasks.Task.CompletedTask;
                    }
                };
                //options.SecurityTokenValidators.Add(new CustomJwtSecurityTokenHandler());
            });
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "KKN.VP.API", Version = "v1" });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("AllowAnyOrigin");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
