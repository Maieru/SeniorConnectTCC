using Microsoft.IdentityModel.Tokens;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.TOs.User;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class BearerTokenService
    {
        public JwtTokenConfigurationOptions JwtConfigurationOptions { get; set; }

        public BearerTokenService(JwtTokenConfigurationOptions jwtConfigurationOptions)
        {
            JwtConfigurationOptions = jwtConfigurationOptions;
        }

        public BearerTokenTO CreateAccessToken(User usuario)
        {
            var keyBytes = Encoding.UTF8.GetBytes(JwtConfigurationOptions.SigningKey);
            var symmetricKey = new SymmetricSecurityKey(keyBytes);

            var signingCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim("subject", usuario.Id.ToString()),
                new Claim("name", usuario.Username),
                new Claim("subscription", usuario.SubscriptionId.ToString())
            };

            var token = new JwtSecurityToken(
                claims: claims,
                issuer: JwtConfigurationOptions.Issuer,
                audience: JwtConfigurationOptions.Audience,
                expires: DateTime.Now.AddSeconds(JwtConfigurationOptions.ExpirationSeconds),
                signingCredentials: signingCredentials);

            var rawToken = new JwtSecurityTokenHandler().WriteToken(token);

            return new BearerTokenTO()
            {
                Expiration = token.ValidTo,
                Token = rawToken
            };
        }
    }
}
