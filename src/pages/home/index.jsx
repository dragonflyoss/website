import React from 'react';
import ReactDOM from 'react-dom';
import SimplexNoise from 'simplex-noise';
import { getScrollTop, getLink } from '../../../utils';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import homeConfig from '../../../site_config/home';
import './index.scss';

const hsla = (h, s, l, a) => `hsla( ${h}, ${s}%, ${l}%, ${a})`;
const rand = (min, max) => Math.random() * (max - min) + min;
const particles = [];
const particleCount = 600;
const unit = 30;
const cols = 24;
const rows = 24;
const w = unit * cols;
const h = unit * rows;
const offInc = 0.04;
const tickMult = 0.003;
let tick = 0;
const simplex = new SimplexNoise();

class Particle {
  constructor(ctx) {
    this.ctx = ctx;
    this.path = [];
    this.noiseDirection = 0;
    this.noiseMagnitude = 0;
    this.pathLength = 6;
    this.speed = 10;
    this.reset();
  }

  reset = () => {
    this.path.length = 0;
    this.x = rand(0, w);
    this.y = rand(0, h);
    this.cx = 0;
    this.cy = 0;
    this.vx = 0;
    this.vy = 0;
    this.alpha = 0;
  }

  step = () => {
    if (this.alpha < 1) {
      this.alpha += 0.025;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.cx = Math.max(0, Math.min(cols - 1, Math.floor(this.x / unit)));
    this.cy = Math.max(0, Math.min(rows - 1, Math.floor(this.y / unit)));

    this.path.unshift(this.x, this.y);
    if (this.path.length > this.pathLength * 2) {
      this.path.pop();
      this.path.pop();
    }

    const len = this.path.length;
    if (len > 0) {
      const _lastPointX = this.path[len - 2];
      const _lastPointY = this.path[len - 1];
      if (_lastPointX > w || _lastPointX < 0 || _lastPointY > h || _lastPointY < 0) {
        this.reset();
      }
    }

    let _noise1 = simplex.noise3D(offInc * this.cx, offInc * this.cy, tick * tickMult);
    _noise1 = Math.min(1, _noise1);
    _noise1 = Math.max(-1, _noise1);
    this.noiseDirection = (_noise1 + 1) * Math.PI;

    let _noise2 = simplex.noise3D(offInc * this.cx, offInc * this.cy, tick * tickMult + 100);
    _noise2 = Math.min(1, _noise2);
    _noise2 = Math.max(-1, _noise2);
    this.noiseMagnitude = (_noise2 + 1) / 2;

    this.vxTarget = Math.cos(this.noiseDirection) * this.noiseMagnitude * this.speed;
    this.vyTarget = Math.sin(this.noiseDirection) * this.noiseMagnitude * this.speed;

    this.vx += (this.vxTarget - this.vx) * 0.1;
    this.vy += (this.vyTarget - this.vy) * 0.1;
  }

  draw = () => {
    const len = this.path.length;
    if (len > 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.path[len - 2], this.path[len - 1]);
      this.ctx.strokeStyle = hsla(tick + (this.x + this.y) / (w + h) * 180, 80, 50, this.alpha);
      this.ctx.stroke();
    }
  }
}

class Home extends Language {

  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',
        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });
    // 动效实现
    const canvas = document.querySelector('#animation-canvas');
    const ctx = canvas.getContext('2d');
    const step = () => {
      if (particles.length < particleCount) {
        particles.push(new Particle(ctx));
      }
      let i = particles.length;
      while (i--) {
        particles[i].step();
      }
      tick++;
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      let i = particles.length;
      while (i--) {
        particles[i].draw();
      }
    };
    const requestAnimationFrame = window.requestAnimationFrame || ((cb) => { setTimeout(cb, 0); });
    const loop = () => {
      requestAnimationFrame(loop);
      step();
      draw();
    };
    const init = () => {
      canvas.width = w;
      canvas.height = h;
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 2;
      loop();
    };
    init();
  }

  render() {
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType } = this.state;
    const headerLogo = headerType === 'primary' ? 'https://img.alicdn.com/tfs/TB1n0Ekt5rpK1RjSZFhXXXSdXXa-266-72.png' : 'https://img.alicdn.com/tfs/TB1ThlOucfpK1RjSZFOXXa6nFXa-266-72.png';
    return (
      <div className="home-page">
        <section className="top-section">
          <Header
            currentKey="home"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />
          <div className="vertical-middle">
            <div className="product-name">
              <h2>{dataSource.brand.brandName}</h2>
            </div>
            <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
            <div className="button-area">
            {
              dataSource.brand.buttons.map(b => <Button type={b.type} key={b.type} link={b.link} target={b.target}>{b.text}</Button>)
            }
            </div>
          </div>
          <canvas id="animation-canvas" />
        </section>
        <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.introduction.title}</h3>
              <p>{dataSource.introduction.desc}</p>
              <ul>
                {
                  dataSource.introduction.list.map((t, i) => (
                    <li key={i}><p>{t}</p></li>
                  ))
                }
              </ul>
            </div>
            <img src={getLink(dataSource.introduction.img)} />
          </div>
        </section>
        <section className="feature-section">
          <div className="feature-container">
            <h3>{dataSource.features.title}</h3>
            <ul>
            {
              dataSource.features.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))
            }
            </ul>
          </div>
        </section>
        <section className="users-section">
          <h3>{dataSource.users.title}</h3>
          {
            dataSource.users.desc ? <p>{dataSource.users.desc}</p> : null
          }
          <div className="users">
          {
            dataSource.users.list.map((user, i) => (
              <div key={i} className="user"><img src={getLink(user)} /></div>
            ))
          }
          </div>
        </section>
        <Footer logo="https://img.alicdn.com/tfs/TB1H9Eht9zqK1RjSZPxXXc4tVXa-266-72.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
