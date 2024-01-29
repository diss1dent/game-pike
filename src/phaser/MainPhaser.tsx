import { onMount, onCleanup, createSignal} from "solid-js";
import Phaser from 'phaser';
import {phaserConfig} from './config/phaserConfig'

function MainPhaser() {
  let [gameContainer, setGameContainer] = createSignal();
  let game:Phaser.Game;

  onMount(() => {
    // Обновляем конфигурацию Phaser здесь, после инициализации gameContainer
    const updatedConfig:object = {
      ...phaserConfig,
      parent: gameContainer() // Используем вызов функции для получения текущего значения
    };

    game = new Phaser.Game(updatedConfig);
  });

  onCleanup(() => {
    if (game) {
      game.destroy(true);
    }
  });

  return (
    <div class="game-container">
      <div ref={setGameContainer}> 
      </div>
    </div>
  );
}

export default MainPhaser
