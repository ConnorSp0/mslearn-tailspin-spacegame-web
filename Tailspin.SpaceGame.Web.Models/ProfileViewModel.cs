using System.Collections.Generic;

namespace TailSpin.SpaceGame.Web.Models
{
    public class ProfileViewModel
    {
        public Profile PlayerProfile { get; set; }
        public IEnumerable<Score> Scores { get; set; }
    }
}
