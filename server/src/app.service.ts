import { Injectable } from '@nestjs/common';
import { escpos } from '../config/escpos';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAvailableUSBPrinters(): any[] | boolean {
    return escpos.USB.findPrinter();
  }
}
