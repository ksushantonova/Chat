import srpBigint from 'srp-bigint';
import bufferJson from 'buffer-json';

export class Auth {
  s: any;
  encryptKey: Buffer;
  incomeData: any;

  async authUserStepTwo(res: any, data: any) {
    this.incomeData = data;
    const params = srpBigint.params['2048'];
    const secret2 = await srpBigint.genKey();
    this.s = new srpBigint.Server(
      params,
      Buffer.from(data.verifier),
      secret2,
    );
    const srpB = this.s.computeB();
    const str = data.stringify({ buf: srpB });
    res.send(str);
  }

  authUserStepThree(data: any, res: any) {
    if (data.sprA) {
      this.s.setA(Buffer.from(data.sprA.data));
    } else {
      this.s.setA(Buffer.from(this.incomeData.sprA.data));
    }
    this.s.checkM1(Buffer.from(data.m1));
    const key = this.s.computeK();
    this.encryptKey = bufferJson.stringify(key);
    res.send('done');
  }
}
