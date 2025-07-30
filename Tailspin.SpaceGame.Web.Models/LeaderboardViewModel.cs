using TailSpin.SpaceGame.Web.Models;

namespace TailSpin.SpaceGame.Web.Models

public class LeaderboardViewModel
{
    public IEnumerable<Score> Scores { get; set; }
    public Profile PlayerProfile { get; set; }

    // Paging
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalResults { get; set; }
    public string PrevLink { get; set; }
    public string NextLink { get; set; } //  Add this

    // Filters
    public string SelectedMode { get; set; }
    public string SelectedRegion { get; set; }
    public IEnumerable<string> GameModes { get; set; }
    public IEnumerable<string> GameRegions { get; set; }
}
