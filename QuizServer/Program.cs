using Microsoft.EntityFrameworkCore;
using QuizServer.Models;
using QuizServer.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
//builder.Services.AddDbContext<QuizServer.Models.PerfectQuizAppDBContext>();

var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<PerfectQuizAppDBContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddTransient<UserMasterRepository>();
builder.Services.AddTransient<SubjectExpertRepository>();

builder.Services.AddTransient<CustomerMasterRepository>();
builder.Services.AddTransient<OrganizationMasterRepository>();
builder.Services.AddTransient<SubjectMasterRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
