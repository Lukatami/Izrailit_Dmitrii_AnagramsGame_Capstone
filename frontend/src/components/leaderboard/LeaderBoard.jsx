import { useEffect } from "react";
import { useLeaderBoardStore } from "../../stores/leaderBoardStore";
import { usePlayerStore } from "../../stores/playerStore";

function LeaderBoard() {
  const { topList, myRank, isLoading, fetchLeaderBoards } =
    useLeaderBoardStore();
  const { isLoggedIn } = usePlayerStore();

  useEffect(() => {
    fetchLeaderBoards();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Leaderboard</h2>

      <div>
        <h3>Top Players</h3>

        {topList?.map((player, index) => (
          <div key={player._id}>
            #{index + 1}
            <img src={player.userAvatar} alt="" />
            Player Name: {player.userName}
            Total Games: {player.totalGames || 0}
            Total Score: {player.totalScore || 0}
          </div>
        ))}
      </div>

      {isLoggedIn && myRank && (
        <div>
          <h3>Your Rank</h3>
          <div>
            #{myRank.rank}
            <img src={myRank.player.userAvatar} alt="" />
            Player Name: {myRank.player.userName}
            Total Games: {myRank.player.totalGames || 0}
            Total Score: {myRank.player.totalScore || 0}
          </div>
        </div>
      )}

      {!isLoggedIn && <div>Log in to see your rank</div>}
    </div>
  );
}

export default LeaderBoard;
