using Microsoft.EntityFrameworkCore;
using QuizServer.Models;
using QuizServer.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<PerfectQuizAppDBContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddTransient<UserMasterRepository>();
builder.Services.AddTransient<SubjectExpertRepository>();

builder.Services.AddTransient<CustomerMasterRepository>();
builder.Services.AddTransient<OrganizationMasterRepository>();
builder.Services.AddTransient<SubjectMasterRepository>();

// CORS: allow Angular dev server (adjust origins as needed)
var angularDevOrigins = new[] { "http://localhost:4200", "https://localhost:4200" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins(angularDevOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS policy before routing/authorization
app.UseCors("AllowAngularDev");

app.UseAuthorization();

app.MapControllers();

app.Run();
