function ensureDomPolyfills() {
  const g = globalThis as Record<string, unknown>;
  if (typeof g.DOMMatrix === 'undefined') {
    class DOMMatrixPolyfill {
      a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
      m11 = 1; m12 = 0; m21 = 0; m22 = 1; m41 = 0; m42 = 0;
      is2D = true;
      isIdentity = true;
      constructor(init?: number[] | string) {
        if (Array.isArray(init) && init.length >= 6) {
          [this.a, this.b, this.c, this.d, this.e, this.f] = init as number[];
          this.m11 = this.a; this.m12 = this.b; this.m21 = this.c; this.m22 = this.d;
          this.m41 = this.e; this.m42 = this.f;
          this.isIdentity = false;
        }
      }
      multiplySelf() { return this; }
      preMultiplySelf() { return this; }
      translateSelf() { return this; }
      scaleSelf() { return this; }
      rotateSelf() { return this; }
      invertSelf() { return this; }
      multiply() { return new DOMMatrixPolyfill(); }
      translate() { return new DOMMatrixPolyfill(); }
      scale() { return new DOMMatrixPolyfill(); }
      inverse() { return new DOMMatrixPolyfill(); }
      transformPoint(p?: { x?: number; y?: number }) { return { x: p?.x ?? 0, y: p?.y ?? 0, z: 0, w: 1 }; }
    }
    g.DOMMatrix = DOMMatrixPolyfill;
  }
  if (typeof g.Path2D === 'undefined') {
    g.Path2D = class Path2D {};
  }
  if (typeof g.ImageData === 'undefined') {
    g.ImageData = class ImageData {
      constructor(public data: Uint8ClampedArray, public width: number, public height: number) {}
    };
  }
}
