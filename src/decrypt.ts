import aes256 from 'aes256';

export function decryptMessage(message: string) {
  const decrypted = aes256.decrypt(this.encryptKey, message);
  return decrypted;
}
