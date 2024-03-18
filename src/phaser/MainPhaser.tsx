import { onMount, onCleanup, createSignal} from "solid-js";
import Phaser from 'phaser';
import {phaserConfig} from './config/phaserConfig'
import {phaserStore} from '../store/phaserStore'

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
    phaserStore.game = game;
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
