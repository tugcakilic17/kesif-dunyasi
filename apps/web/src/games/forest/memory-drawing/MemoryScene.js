import * as Phaser from 'phaser'
import { TREE_WIND_FRAGMENT_SHADER, FOREGROUND_WIND_FRAGMENT_SHADER } from './shaders'
import backgroundUrl from './assets/background/background.png'
import compassUrl from './assets/background/compass.png'
import foregroundLeavesUrl from './assets/background/foreground_leaves.png'
import treeLeavesUrl from './assets/background/tree_leaves.png'
import cellEmptyUrl from './assets/ui/cell_empty.png'
import cellFilledUrl from './assets/ui/cell_filled.png'
import mascotLookUrl from './assets/ui/maskot_look.png'
import mascotNormalUrl from './assets/ui/maskot_normal.png'
import memoryNotebookUrl from './assets/ui/memory_notebook.png'

export const DESIGN_WIDTH = 1672
export const DESIGN_HEIGHT = 941
const DESIGN_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT

export function createMemoryScene({ selectedGridSize, roundResults, timerKey, timerRunning, timerProgress, ready, completed, motionReduced }) {
  return class MemoryScene extends Phaser.Scene {
    constructor() {
      super('MemoryScene')
    }

    preload() {
      this.load.image('background', backgroundUrl)
      this.load.image('tree-leaves', treeLeavesUrl)
      this.load.image('memory-notebook', memoryNotebookUrl)
      this.load.image('cell-empty', cellEmptyUrl)
      this.load.image('cell-filled', cellFilledUrl)
      this.load.image('mascot-look', mascotLookUrl)
      this.load.image('mascot-normal', mascotNormalUrl)
      this.load.image('compass', compassUrl)
      this.load.image('foreground-leaves', foregroundLeavesUrl)
    }

    create() {
      this.backgroundLayers = this.add.container(0, 0)

      const background = this.add.image(
        DESIGN_WIDTH / 2,
        DESIGN_HEIGHT / 2,
        'background',
      )
      this.treeLeaves = this.add.shader(
        {
          name: 'TreeWind',
          fragmentSource: TREE_WIND_FRAGMENT_SHADER,
          setupUniforms: (setUniform) => {
            setUniform('uTreeLeaves', 0)
            setUniform('uTime', motionReduced() ? 0 : this.game.loop.time / 1000)
          },
        },
        DESIGN_WIDTH / 2,
        DESIGN_HEIGHT / 2,
        DESIGN_WIDTH,
        DESIGN_HEIGHT,
        ['tree-leaves'],
      )
      this.backgroundLayers.add([background, this.treeLeaves])

      this.notebookUi = this.add.container(0, 0)
      const notebook = this.add.image(0, 0, 'memory-notebook')
      this.notebookUi.add(notebook)

      this.leftGridContainer = this.add.container(-336, -8)
      this.rightGridContainer = this.add.container(336, -8)
      this.notebookUi.add([this.leftGridContainer, this.rightGridContainer])
      this.leftCells = []
      this.rightCells = []
      this.setCellAppearance = (cell, filled) => {
        const emptySize = cell.getData('cellSize') ?? 168

        if (filled) {
          cell
            .setTexture('cell-filled')
            .setDisplaySize(emptySize * (163 / 168), emptySize * (148 / 168))
          return
        }

        cell.setTexture('cell-empty').setDisplaySize(emptySize, emptySize)
      }

      this.mascotLook = this.add.image(0, 0, 'mascot-look').setOrigin(0.5, 1)
      this.mascotNormal = this.add
        .image(0, 0, 'mascot-normal')
        .setOrigin(0.5, 1)
        .setAlpha(0)

      this.foregroundLayers = this.add.container(0, 0)
      this.compass = this.add.image(
        DESIGN_WIDTH / 2,
        DESIGN_HEIGHT / 2,
        'compass',
      )
      this.foregroundLeaves = this.add.shader(
        {
          name: 'ForegroundWind',
          fragmentSource: FOREGROUND_WIND_FRAGMENT_SHADER,
          setupUniforms: (setUniform) => {
            setUniform('uForegroundLeaves', 0)
            setUniform('uTime', motionReduced() ? 0 : this.game.loop.time / 1000)
          },
        },
        DESIGN_WIDTH / 2,
        DESIGN_HEIGHT / 2,
        DESIGN_WIDTH,
        DESIGN_HEIGHT,
        ['foreground-leaves'],
      )
      this.foregroundLayers.add([this.compass, this.foregroundLeaves])

      this.resizeScene(this.scale.gameSize)
      this.changeGridSize(selectedGridSize.value, true)
      ready.value = true
      this.scale.on('resize', this.resizeScene, this)
      this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        this.scale.off('resize', this.resizeScene, this)
        this.mascotSwitchTimer?.remove()
        this.roundTimeoutTimer?.remove()
        this.clearRoundTimers()
      })
    }

    getGridLayout(size) {
      const layouts = {
        3: { cellSize: 168, spacing: 145 },
        4: { cellSize: 132, spacing: 112 },
        5: { cellSize: 108, spacing: 90 },
      }

      return layouts[size]
    }

    createRoundPatterns(size) {
      const patternFromColumns = (columns) =>
        new Set(columns.map((column, row) => row * size + column))

      return [
        patternFromColumns(Array.from({ length: size }, (_, index) => index)),
        patternFromColumns(Array.from({ length: size }, (_, index) => size - 1 - index)),
        patternFromColumns(Array.from({ length: size }, (_, index) => (index * 2) % size)),
        patternFromColumns(Array.from({ length: size }, () => Math.floor(size / 2))),
        patternFromColumns(Array.from({ length: size }, (_, index) => (index + 1) % size)),
      ]
    }

    buildGrid(size) {
      this.leftGridContainer.removeAll(true)
      this.rightGridContainer.removeAll(true)
      this.leftCells = []
      this.rightCells = []

      const { cellSize, spacing } = this.getGridLayout(size)
      const offset = (size - 1) / 2

      const pageGrids = [this.leftGridContainer, this.rightGridContainer]
      pageGrids.forEach((pageGrid, pageIndex) => {
        for (let row = 0; row < size; row += 1) {
          for (let column = 0; column < size; column += 1) {
            const cellIndex = row * size + column
            const x = (column - offset) * spacing
            const y = (row - offset) * spacing
            const cell = this.add.image(x, y, 'cell-empty')
            cell
              .setData('cellIndex', cellIndex)
              .setData('restingX', x)
              .setData('cellSize', cellSize)
            this.setCellAppearance(cell, false)

            if (pageIndex === 0) {
              this.leftCells.push(cell)
            } else {
              this.rightCells.push(cell)
              cell
                .setInteractive({
                  useHandCursor: true,
                  pixelPerfect: true,
                  alphaTolerance: 1,
                })
                .on('pointerdown', () => this.handleRightCell(cell, cellIndex))
            }

            pageGrid.add(cell)
          }
        }
      })
    }

    changeGridSize(size, initial = false) {
      if (!initial && this.gridSize === size) return

      this.clearRoundTimers()
      this.roundTimeoutTimer?.remove()
      roundResults.value = Array(5).fill(null)
      completed.value = false
      timerRunning.value = false
      this.gridSize = size
      this.roundPatterns = this.createRoundPatterns(size)
      this.buildGrid(size)
      this.startRound(0, initial)
    }

    handleRightCell(cell, cellIndex) {
      if (this.roundTransitioning || cell.getData('feedbackLocked')) return

      if (!this.currentPattern.has(cellIndex)) {
        const restingX = cell.x
        const restingScaleX = cell.scaleX
        const restingScaleY = cell.scaleY

        cell.setData('feedbackLocked', true).setTint(0xff5b5b)

        this.tweens.add({
          targets: cell,
          x: restingX + 7,
          scaleX: restingScaleX * 1.08,
          scaleY: restingScaleY * 1.08,
          duration: 100,
          ease: 'Sine.Out',
          onComplete: () => {
            this.tweens.add({
              targets: cell,
              x: restingX,
              scaleX: restingScaleX,
              scaleY: restingScaleY,
              duration: 120,
              ease: 'Sine.InOut',
              onComplete: () => {
                cell.clearTint().setData('feedbackLocked', false)
              },
            })
          },
        })
        return
      }

      this.setCellAppearance(cell, true)
      cell.disableInteractive()
      this.popCellIntoPlace(cell, 0, 1.3)

      this.solvedCells.add(cellIndex)
      if (this.solvedCells.size === this.currentPattern.size) {
        this.finishRound()
      }
    }

    clearRoundTimers() {
      this.roundTimers?.forEach((timer) => timer.remove(false))
      this.roundTimers = []
    }

    queueRoundCall(delay, callback) {
      const timer = this.time.delayedCall(delay, callback)
      this.roundTimers ??= []
      this.roundTimers.push(timer)
      return timer
    }

    popCellIntoPlace(cell, delay = 0, overshoot = 1.28) {
      const restingScaleX = cell.scaleX
      const restingScaleY = cell.scaleY
      cell.setScale(restingScaleX * 0.12, restingScaleY * 0.12).setAlpha(0.25)

      const animate = () => {
        this.tweens.add({
          targets: cell,
          scaleX: restingScaleX * overshoot,
          scaleY: restingScaleY * overshoot,
          alpha: 1,
          duration: 180,
          ease: 'Cubic.Out',
          onComplete: () => {
            this.tweens.add({
              targets: cell,
              scaleX: restingScaleX,
              scaleY: restingScaleY,
              duration: 110,
              ease: 'Sine.InOut',
            })
          },
        })
      }

      if (delay > 0) {
        this.queueRoundCall(delay, animate)
      } else {
        animate()
      }
    }

    startRound(roundIndex, initial = false) {
      this.clearRoundTimers()
      this.roundTimeoutTimer?.remove()
      timerRunning.value = false
      this.currentRound = roundIndex
      this.currentPattern = this.roundPatterns[roundIndex]
      this.solvedCells = new Set()
      this.roundTransitioning = true

      this.leftCells.forEach((cell) => {
        this.tweens.killTweensOf(cell)
        cell.clearTint().setAlpha(1)
        this.setCellAppearance(cell, false)
      })

      Array.from(this.currentPattern).forEach((cellIndex, order) => {
        const cell = this.leftCells[cellIndex]
        this.setCellAppearance(cell, true)
        this.popCellIntoPlace(cell, 260 + order * 145)
      })

      this.rightCells.forEach((cell) => {
        this.tweens.killTweensOf(cell)
        cell
          .setX(cell.getData('restingX'))
          .setAlpha(1)
          .clearTint()
          .setData('feedbackLocked', false)
          .disableInteractive()
        this.setCellAppearance(cell, false)
      })

      this.showLookMascot(initial)

      this.queueRoundCall(850, () => {
        this.roundTransitioning = false
        this.rightCells.forEach((cell) => {
          cell.setInteractive({
            useHandCursor: true,
            pixelPerfect: true,
            alphaTolerance: 1,
          })
        })
        this.startRoundTimer()
      })
    }

    startRoundTimer() {
      timerKey.value += 1
      timerRunning.value = true
      timerProgress.value = 1
      this.roundTimeoutTimer = this.time.delayedCall(10000, () => {
        this.handleRoundTimeout()
      })
    }

    update() {
      if (timerRunning.value && this.roundTimeoutTimer) {
        timerProgress.value = Math.max(0, 1 - this.roundTimeoutTimer.getProgress())
      }
    }

    handleRoundTimeout() {
      if (this.roundTransitioning) return

      timerRunning.value = false
      this.roundTransitioning = true
      roundResults.value = roundResults.value.map((result, index) =>
        index === this.currentRound ? false : result,
      )
      this.rightCells.forEach((cell) => cell.disableInteractive())

      const nextRound = this.currentRound + 1
      if (nextRound >= this.roundPatterns.length) {
        completed.value = true
        return
      }

      this.queueRoundCall(650, () => this.startRound(nextRound))
    }

    finishRound() {
      this.roundTimeoutTimer?.remove()
      timerRunning.value = false
      this.roundTransitioning = true
      this.rightCells.forEach((cell) => cell.disableInteractive())
      roundResults.value = roundResults.value.map((result, index) =>
        index === this.currentRound ? true : result,
      )

      const nextRound = this.currentRound + 1
      if (nextRound >= this.roundPatterns.length) {
        completed.value = true
        return
      }

      this.queueRoundCall(650, () => this.startRound(nextRound))
    }

    showLookMascot(initial = false) {
      this.mascotSwitchTimer?.remove()
      this.tweens.killTweensOf(this.mascotLook)
      this.tweens.killTweensOf(this.mascotNormal)

      const lookScaleX = this.mascotLookBaseScaleX
      const lookScaleY = this.mascotLookBaseScaleY
      const normalScaleX = this.mascotNormalBaseScaleX
      const normalScaleY = this.mascotNormalBaseScaleY

      this.mascotLook.setVisible(true)
      this.mascotNormal.setVisible(true)

      if (initial) {
        this.mascotLook.setScale(lookScaleX, lookScaleY).setAlpha(1)
        this.mascotNormal.setScale(normalScaleX, normalScaleY).setAlpha(0)
      } else {
        this.mascotLook
          .setScale(lookScaleX * 0.92, lookScaleY * 0.92)
          .setAlpha(0)

        this.tweens.add({
          targets: this.mascotNormal,
          alpha: 0,
          scaleX: normalScaleX * 0.96,
          scaleY: normalScaleY * 0.96,
          duration: 320,
          ease: 'Sine.InOut',
        })

        this.tweens.add({
          targets: this.mascotLook,
          alpha: 1,
          scaleX: lookScaleX,
          scaleY: lookScaleY,
          duration: 420,
          ease: 'Back.Out',
        })
      }

      this.mascotSwitchTimer = this.time.delayedCall(1800, () => {
        this.showNormalMascot()
      })
    }

    showNormalMascot() {
      const lookScaleX = this.mascotLookBaseScaleX
      const lookScaleY = this.mascotLookBaseScaleY
      const normalScaleX = this.mascotNormalBaseScaleX
      const normalScaleY = this.mascotNormalBaseScaleY

      this.mascotNormal
        .setScale(normalScaleX * 0.92, normalScaleY * 0.92)
        .setAlpha(0)

      this.tweens.add({
        targets: this.mascotLook,
        alpha: 0,
        scaleX: lookScaleX * 0.96,
        scaleY: lookScaleY * 0.96,
        duration: 520,
        ease: 'Sine.InOut',
        onComplete: () => this.mascotLook.setVisible(false),
      })

      this.tweens.add({
        targets: this.mascotNormal,
        alpha: 1,
        scaleX: normalScaleX,
        scaleY: normalScaleY,
        duration: 620,
        ease: 'Back.Out',
      })
    }

    resizeScene(gameSize) {
      const screenWidth = gameSize.width
      const screenHeight = gameSize.height
      const isPortrait = screenWidth < screenHeight
      const isPhonePortrait = isPortrait && screenWidth <= 480
      const isStackedPortrait = isPortrait && screenWidth <= 768
      const isCompact = screenWidth < 720 || screenHeight < 620
      const coverScale = Math.max(
        screenWidth / DESIGN_WIDTH,
        screenHeight / DESIGN_HEIGHT,
      )
      const offsetX = (screenWidth - DESIGN_WIDTH * coverScale) / 2
      const offsetY = (screenHeight - DESIGN_HEIGHT * coverScale) / 2

      this.backgroundLayers.setPosition(offsetX, offsetY).setScale(coverScale)
      this.foregroundLayers.setPosition(offsetX, offsetY).setScale(coverScale)

      const notebookWidth = isPortrait
        ? Math.min(
            screenWidth *
              (isPhonePortrait ? 1.14 : isStackedPortrait ? 0.9 : 0.98),
            screenHeight *
              (isPhonePortrait ? 0.54 : isStackedPortrait ? 0.56 : 0.62) *
              DESIGN_RATIO,
          )
        : Math.min(
            screenWidth * (isCompact ? 0.84 : 0.78),
            1190,
            screenHeight * 0.78 * DESIGN_RATIO,
          )
      const notebookY = isPortrait
        ? screenHeight *
          (isPhonePortrait ? 0.37 : isStackedPortrait ? 0.34 : 0.42)
        : screenHeight / 2 + Math.min(24, Math.max(12, screenHeight * 0.02)) - 28

      this.notebookUi
        .setPosition(screenWidth / 2, notebookY)
        .setScale(notebookWidth / DESIGN_WIDTH)

      const mascotHeight = isPortrait
        ? Math.min(
            screenHeight * (isPhonePortrait ? 0.28 : 0.26),
            screenWidth * (isPhonePortrait ? 0.54 : 0.46),
            260,
          )
        : Math.min(screenHeight * (isCompact ? 0.38 : 0.44), 430)
      const mascotX = isPortrait
        ? isStackedPortrait
          ? screenWidth / 2
          : Math.max(72, screenWidth * 0.19)
        : Math.min(235, Math.max(135, screenWidth * 0.13))
      const mascotBottom = isPortrait
        ? screenHeight *
          (isPhonePortrait ? 0.89 : isStackedPortrait ? 0.91 : 0.86)
        : screenHeight - Math.min(26, screenHeight * 0.025)

      this.mascotLook
        .setPosition(mascotX, mascotBottom)
        .setDisplaySize(mascotHeight * (1086 / 1448), mascotHeight)
      this.mascotNormal
        .setPosition(mascotX, mascotBottom)
        .setDisplaySize(mascotHeight * (1199 / 1312), mascotHeight)

      this.mascotLookBaseScaleX = this.mascotLook.scaleX
      this.mascotLookBaseScaleY = this.mascotLook.scaleY
      this.mascotNormalBaseScaleX = this.mascotNormal.scaleX
      this.mascotNormalBaseScaleY = this.mascotNormal.scaleY
    }
  }
}
