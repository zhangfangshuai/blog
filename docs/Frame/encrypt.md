#### JS的加密策略

JS的加密策略有很多，不详诉，本文只介绍几个最常见的算法策略，以满足工作需要


### 1. 散列算法 MD5
MD5（Message-Digest Algorithm 5）**信息-摘要算法5**是一种广泛使用的散列函数，不是加密算法，因为其加密过程不可逆，无法被解密。<br>
它被用于各种安全应用，也通常用于校验文件的完整性，检查文件是否被变更过等。但MD5不耐碰撞和攻击，因此不适用于SSL证书或数字签名。
```
// 安装
npm install crypto-js
// 或引入cdn
https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
```

```javascript
import CryptoJS from "crypto-js"
const md5 = CryptoJS.MD5('message').toString()
// 默认32位，需要控制16位可截取中间16位
const md5_short = Crypto.MD5('message').toString().substring(8,24)
```
&emsp;

### <div class="red">2. 散列算法 SHA1</div>
SHA（Secure Hash Algorithm）**安全散列算法**是一种与 MD5 同源的数据加密算法，它能计算出一个数字消息所对应到的、长度固定的字符串（又称消息摘要）的算法。且若输入的消息不同，对应到不同字符串的机率很高。SHA1比MD5安全性更好。<br>
SHA1加密算法可用作接口签名，防止刷接口爆破等现象

```javascript
// 使用crypto-js实现
import CryptoJS from "crypto-js"
const sha1 = CryptoJS.SHA1('message').toString()
```

目前为止，SHA1还是有被破解的可能，也可以选择升级版的SHA2（SHA256等）、SHA3等算法，有兴趣可自行了解。

&emsp;

### 3. 对称加密 DES
对称加密只有一个密钥，因此任何一个环节密钥泄密后都会导致数据泄漏。

DES（Data Encryption Standard）**数据加密标准** 是以前比较重要的加密算法，但由于密钥长度太短，安全性不够，被后续的AES所取代。

```javascript
// 假设密钥为 12345678
const privateKey = '12345678'
const encrypted = CryptoJS.DES.encrypt("message", privateKey).toString()
// 解密
const decrypted = CryptoJS.DES.decrypt(encrypted, privateKey).toString(CryptoJS.enc.Utf8)
```
更详细的写法：
```javascript
const encrypted = CryptoJS.DES.encrypt("message", CryptoJS.enc.Utf8.parse(privateKey), {
    mode: CryptoJS.mode.ECB, // ecb模式不需要偏移量
    padding: CryptoJS.pad.Pkcs7
})

const decrypted = CryptoJS.DES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(privateKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
}).toString(CryptoJS.enc.Utf8)
```

另外，由于DES安全性低，因此衍生出了**三重DES**加密。即，轮询三次DES加密

```javascript
const encrypted = CryptoJS.TripleDES.encrypt("message", privateKey).toString()
// 解密
const decrypted = CryptoJS.TripleDES.decrypt(encrypted, privateKey).toString(CryptoJS.enc.Utf8)
```

&emsp;

### <div class="red">4. 对称加密 AES</div>
AES（Advanced Encryption Standard）**高级加密标准**，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。<br/>
在用法上与DES很相似。<br>
公式是： ```明文 + 密钥+ 偏移量（IV）+密码模式(算法/模式/填充)```
```javascript
const privateKey = '12345678'
const encrypted = CryptoJS.AES.encrypt("message", privateKey).toString()
// 解密
const decrypted = CryptoJS.AES.decrypt(encrypted, privateKey).toString(CryptoJS.enc.Utf8)
```
同样有更详尽的写法，与DES相似。

&emsp;

### <div class="red">5. 非对称加密RSA</div>

非对称加密有两组Key，分别为 公钥`publicKey` 和 私钥`privateKey`，通过公钥加密后传输输入，服务端再通过私钥解密。

RSA 通常借助jsEncrypt插件实现
```
// 安装
npm install jsencrypt
```

```javascript
// 引入
import JSEncrypt from 'jsencrypt'
```

```javascript
// 加密
const publicKey = 'publicKey'
const rsa = new JSEncrypt()
rsa.setPublicKey(publicKey)
rsa.encrypt(txt)
```
```javascript
// 解密
const privateKey = 'privateKey'
const rsa = new JSEncrypt()
rsa.setPrivateKey(privateKey)
rsa.decrypt(txt)
```
