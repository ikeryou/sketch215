import './style.css'
import { Color } from "three/src/math/Color";
import { Util } from './libs/util';
import { Param } from './core/param';
import { HSL } from './libs/hsl';
import { Contents } from './parts/contents';

for(let i = 0; i < 50; i++) {
  const hsl = new HSL();
  hsl.h = Util.instance.random(0, 1);
  hsl.s = 1;
  hsl.l = 0.5;

  let col = new Color();
  col = col.setHSL(hsl.h, hsl.s, hsl.l);
  Param.instance.colors.push(col);
}

new Contents({
  el:document.querySelector('.l-main-wrapper')
})

