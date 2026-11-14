import Phaser from 'phaser';

/** Phaser renders the ambient market and small trade feedback effects.
 * Responsive controls and scrollable panels are DOM-based for reliable touch input.
 */
export default class MarketScene extends Phaser.Scene {
  constructor() {
    super('MarketScene');
    this.dust = [];
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');
    const width = this.scale.width;
    const height = this.scale.height;
    this.glow = this.add.graphics();
    this.glow.fillStyle(0x6f8b76, 0.08);
    this.glow.fillCircle(width * 0.82, height * 0.18, Math.min(width, height) * 0.24);
    this.glow.fillStyle(0xb28a53, 0.055);
    this.glow.fillCircle(width * 0.12, height * 0.82, Math.min(width, height) * 0.28);

    for (let index = 0; index < 34; index += 1) {
      const particle = this.add.circle(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 1.8 + 0.5,
        0xe5c98d,
        Math.random() * 0.23 + 0.06
      );
      particle.speed = Math.random() * 8 + 3;
      particle.phase = Math.random() * Math.PI * 2;
      this.dust.push(particle);
    }

    this.game.events.on('merchant:trade', this.onTrade, this);
    this.scale.on('resize', this.onResize, this);
  }

  onResize(gameSize) {
    this.cameras.resize(gameSize.width, gameSize.height);
    this.glow.clear();
    this.glow.fillStyle(0x6f8b76, 0.08);
    this.glow.fillCircle(gameSize.width * 0.82, gameSize.height * 0.18, Math.min(gameSize.width, gameSize.height) * 0.24);
    this.glow.fillStyle(0xb28a53, 0.055);
    this.glow.fillCircle(gameSize.width * 0.12, gameSize.height * 0.82, Math.min(gameSize.width, gameSize.height) * 0.28);
  }

  update(time, delta) {
    const step = delta / 1000;
    for (const particle of this.dust) {
      particle.y -= particle.speed * step;
      particle.x += Math.sin(time / 1800 + particle.phase) * 0.12;
      if (particle.y < -5) {
        particle.y = this.scale.height + 5;
        particle.x = Math.random() * this.scale.width;
      }
    }
  }

  onTrade({ action, total }) {
    const label = `${action === 'buy' ? '−' : '+'}${Math.round(total).toLocaleString('vi-VN')} xu`;
    const color = action === 'buy' ? '#e3b66f' : '#9bd0a6';
    const feedback = this.add.text(this.scale.width / 2, this.scale.height * 0.56, label, {
      fontFamily: 'Georgia, serif',
      fontSize: this.scale.width < 600 ? '18px' : '22px',
      color,
      stroke: '#111a20',
      strokeThickness: 4,
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(20);

    this.tweens.add({
      targets: feedback,
      y: feedback.y - 54,
      alpha: 0,
      duration: 950,
      ease: 'Cubic.Out',
      onComplete: () => feedback.destroy()
    });
  }
}
