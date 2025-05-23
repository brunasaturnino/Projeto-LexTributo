﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using back_end.Entities;
using back_end.Models;
using back_end.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
     


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {
            var token = await authService.LoginAsync(request);
            if (token == null) 
            {
                return BadRequest("Invalid username or password");
            }

            return Ok(token);
        }



        [Authorize]
        [HttpGet("test-auth")]
        public IActionResult AuthenticatedOnlyEndpoint()
        {
            return Ok("You are authenticated");
        }



        [Authorize(Roles = "admin")]
        [HttpGet("test-auth-admin")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok("You are admin");
        }
    }
}
