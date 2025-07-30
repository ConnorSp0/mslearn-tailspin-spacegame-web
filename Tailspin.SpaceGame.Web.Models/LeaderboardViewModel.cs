using System.Collections.Generic;

namespace TailSpin.SpaceGame.Web.Models
{
    public class LeaderboardViewModel
    {
        public IEnumerable<Score> Scores { get; set; }
        public int TotalPlayers { get; set; }
    }
}
