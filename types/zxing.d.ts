declare module '@zxing/library' {
  export class BrowserMultiFormatReader {
    constructor()
    listVideoInputDevices(): Promise<MediaDeviceInfo[]>
    decodeFromVideoDevice(
      deviceId: string | undefined,
      videoElementOrId: string | HTMLVideoElement,
      callback: (result?: Result, err?: unknown) => void
    ): Promise<void>
    reset(): Promise<void>
  }
  export class NotFoundException extends Error {}
  export interface Result {
    getText(): string
  }
}
