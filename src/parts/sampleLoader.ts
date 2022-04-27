
import { Rect } from "../libs/rect";
import { Color } from "three/src/math/Color";
import { Util } from "../libs/util";
import { Param } from "../core/param";

// -----------------------------------------
//
// -----------------------------------------
export class SampleLoader {

  constructor(opt:{id:number, src:string, onLoaded:any, data:Array<Array<any>>}) {

    const color:Color = Util.instance.randomArr(Param.instance.colors);
    const bgColor:Color = new Color(1 - color.r, 1 - color.g, 1 - color.b);

    // 画像解析して選択したとき用のクラスを作っておく
    const img:HTMLImageElement = new Image();
    img.onload = () => {
      // 画像解析
      const cvs:any = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';

      const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const key = ~~(i / 4)
        let ix = ~~(key % cvs.width)
        let iy = ~~(key / cvs.height)

        if(iy % 2 == 0) {
          // let r = data[i + 0] // 0 ~ 255
          // let g = data[i + 1] // 0 ~ 255
          // let b = data[i + 2] // 0 ~ 255
          const a = data[i + 3] // 0 ~ 255

          let col:Color = color.clone();
          if(a <= 0) col = bgColor.clone();

          ix += cvs.width * opt.id;

          // スタイル登録
          const sheets = document.styleSheets;
          const sheet = sheets[sheets.length - 1];
          const name = 'col-' + ix + '-' + iy;
          sheet.insertRule(
            // '.' + name + '::selection { background: ' + col.getStyle() + '; color: #000; }',
            '.' + name + '::selection { color: ' + col.getStyle() + '; background: #000; }',
            sheet.cssRules.length,
          );

          if(opt.data[iy] == undefined || opt.data[iy] == null) opt.data[iy] = [];
          opt.data[iy][ix] = {
            className:name,
            x:ix,
            y:iy,
            blockId:opt.id,
            sampleSize:new Rect(0,0,cvs.width,cvs.height)
          }
        }
      }

      if(opt.onLoaded != undefined) opt.onLoaded();
    }
    img.src = opt.src;
  }
}