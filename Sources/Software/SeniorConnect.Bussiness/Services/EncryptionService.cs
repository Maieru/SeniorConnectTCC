using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class EncryptionService
    {
        private string _encryptionSalt;
        private int _workFactor;

        public EncryptionService(string encryptionSalt, int workFactor)
        {
            _encryptionSalt = encryptionSalt;
            _workFactor = workFactor;
        }

        public async Task<string> Encrypt(string plainText)
        {
            using (var sha512 = SHA512.Create())
            {
                var hash = Convert.ToBase64String(sha512.ComputeHash(Encoding.UTF8.GetBytes(plainText + _encryptionSalt)));
                return BCrypt.Net.BCrypt.HashPassword(hash, _workFactor);
            }
        }

        public async Task<bool> VerifyMatch(string plainText, string encryptedText)
        {
            using (var sha512 = SHA512.Create())
            {
                var hash = Convert.ToBase64String(sha512.ComputeHash(Encoding.UTF8.GetBytes(plainText + _encryptionSalt)));
                return BCrypt.Net.BCrypt.Verify(hash, encryptedText);
            }
        }
    }
}
