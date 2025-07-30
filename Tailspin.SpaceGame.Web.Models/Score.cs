namespace TailSpin.SpaceGame.Web.Models
{
    public class Score : Modelto
    {
        public string PlayerName { get; set; }
        public int ScoreValue { get; set; } // rename to Score if view expects Score
        public string GameMode { get; set; }
        public string GameRegion { get; set; }
        public string ProfileId { get; set; }
        public bool HighScore { get; set; }
    }
}
