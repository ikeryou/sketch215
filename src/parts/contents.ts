
import { MyDisplay } from "../core/myDisplay";
import { Conf } from "../core/conf";
import { SampleLoader } from "./sampleLoader";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _data:Array<Array<any>> = [];
  private _loadedNum:number = 0;
  private _item:Array<any> = [];

  constructor(opt:any) {
    super(opt)

    this._load();
  }


  private _load(): void {
    const id = this._loadedNum;
    new SampleLoader({
      id:id,
      src:Conf.instance.PATH_IMG + 'sample-' + id + '.png',
      onLoaded: () => {
        this._eLoaded();
      },
      data: this._data,
    })
  }


  private _eLoaded(): void {
    this._loadedNum++;
    if(this._loadedNum >= Conf.instance.NUM) {
      this._start();
    } else {
      this._load();
    }
  }


  private _start(): void {
    const tg = this.qs('.inner');
    const num = 4;
    const max = this._data[0][0].sampleSize.width * num;
    const txt = 'IKERYOU-';
    // 必要な分だけテキスト作成
    this._data.forEach((val,iy) => {
      val.forEach((val2,ix) => {
        if(ix <= max) {
          // テキスト配置
          const el = document.createElement('div');
          el.innerHTML = txt.split('')[this._item.length % txt.length];
          this._item.push({
            el:el,
            ix:ix,
            iy:iy,
            data:val2,
            now:val2.className,
            cnt:0,
          });
          tg.append(el);

          el.classList.add(val2.className);

          // 一定間隔で改行配置
          if(ix == val2.sampleSize.width * num) {
            tg.append(document.createElement('br'));
          }
        }
      })
    })

    console.log(this._item);
  }


  protected _update(): void {
    super._update();

    if(this._c % 4 == 0 && this._item.length > 0) {
      const maxIx = this._item[0].data.sampleSize.width * Conf.instance.NUM
      this._item.forEach((val) => {
        const el:HTMLElement = val.el;
        el.classList.remove(val.now);

        let ix = (val.cnt + val.ix) % maxIx;
        let n = 'col-' + ix + '-' + val.iy;
        val.now = n;
        el.classList.add(val.now);

        val.cnt += 4;
      })
    }
  }
}