import { Body, Controller, Get, Post } from '@nestjs/common';
import { Printer, USB } from 'escpos';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/printers/usb')
  getUSBPrinters(): any[] | boolean {
    return this.appService.getAvailableUSBPrinters();
  }

  @Post('/print')
  async print(@Body() data: any) {
    const device = await this.getUSBPrinters()[0];
    console.log(device);
    const printer = await Printer.create(device);
    console.log(device);
    console.log(data);

    printer
      .font('A')
      .align('CT')
      .style('BU')
      .size(1, 1)
      .text('The quick brown fox jumps over the lazy dog')
      .text('敏捷的棕色狐狸跳过懒狗')
      .barcode('1234567', 'EAN8')
      .table(data.table);

    printer.cut();
    printer.close();
  }
}
