export function md5(data: Uint8Array): Uint8Array {
  const S=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
  const K=new Uint32Array([0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391]);
  let a0=0x67452301,b0=0xefcdab89,c0=0x98badcfe,d0=0x10325476;
  const len=data.length, padded=((len+9+63)&~63), msg=new Uint8Array(padded); msg.set(data); msg[len]=0x80;
  new DataView(msg.buffer).setUint32(padded-8,len*8,true);
  for(let off=0;off<padded;off+=64){
    const chunk=new Uint32Array(msg.buffer,off,16); let a=a0,b=b0,c=c0,d=d0;
    for(let i=0;i<64;i++){let f,g;if(i<16){f=(b&c)|((~b)&d);g=i}else if(i<32){f=(d&b)|((~d)&c);g=(5*i+1)%16}else if(i<48){f=b^c^d;g=(3*i+5)%16}else{f=c^(b|(~d));g=(7*i)%16}f=(f+a+K[i]+chunk[g])>>>0;a=d;d=c;c=b;b=(b+((f<<S[i])|(f>>>(32-S[i]))))>>>0}
    a0=(a0+a)>>>0;b0=(b0+b)>>>0;c0=(c0+c)>>>0;d0=(d0+d)>>>0;
  }
  const out=new Uint8Array(16),v=new DataView(out.buffer);v.setUint32(0,a0,true);v.setUint32(4,b0,true);v.setUint32(8,c0,true);v.setUint32(12,d0,true);return out;
}
export class RC4{private s=new Uint8Array(256);private i=0;private j=0;constructor(key:Uint8Array){for(let i=0;i<256;i++)this.s[i]=i;let j=0;for(let i=0;i<256;i++){j=(j+this.s[i]+key[i%key.length])&255;[this.s[i],this.s[j]]=[this.s[j],this.s[i]]}}process(data:Uint8Array){const out=new Uint8Array(data.length);for(let k=0;k<data.length;k++){this.i=(this.i+1)&255;this.j=(this.j+this.s[this.i])&255;[this.s[this.i],this.s[this.j]]=[this.s[this.j],this.s[this.i]];out[k]=data[k]^this.s[(this.s[this.i]+this.s[this.j])&255]}return out}}
export function bytesToHex(bytes:Uint8Array){return Array.from(bytes).map(b=>b.toString(16).padStart(2,'0')).join('')}
