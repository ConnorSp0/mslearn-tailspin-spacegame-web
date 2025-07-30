using TailSpin.SpaceGame.Web.Models;


namespace TailSpin.SpaceGame.Web.Models

public class Score : Modelto
{
    public string PlayerName { get; set; }
    public int Points { get; set; }  // Match view expectation
    public string GameMode { get; set; }
    public string GameRegion { get; set; }
    public string ProfileId { get; set; }
    public bool HighScore { get; set; }

    // ADD THIS:
    public Profile Profile { get; set; }
}
