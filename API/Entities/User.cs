using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}