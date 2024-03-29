
using DARcare.Repositories;

namespace DARcare
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<IPatientRepository, PatientRepository>();
            builder.Services.AddTransient<IStaffRepository, StaffRepository>();
            builder.Services.AddTransient<IEncounterRepository, EncounterRepository>();
            builder.Services.AddTransient<IDepartmentRepository, DepartmentRepository>();
            builder.Services.AddTransient<IDischargeStatusRepository, DischargeStatusRepository>();
            builder.Services.AddTransient<IStaffTypeRepository, StaffTypeRepository>();
            builder.Services.AddTransient<ITreatmentRepository, TreatmentRepository>();
            builder.Services.AddTransient<IProcedureRepository, ProcedureRepository>();
            builder.Services.AddTransient<ILocationRepository, LocationRepository>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
