import { GameData } from '@/model/game.models'

const GameDataFactory = {
  create: function (games) {
    const gameData = []

    for (const game in games) {
      gameData.push(new GameData(games[game]))
    }

    return gameData
  }
}

export { GameDataFactory }
