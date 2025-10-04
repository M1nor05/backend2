import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/common/guards/authGuard';
;

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPayment(
    @Request() req: any,
    @Body() body: { tariffId: string; provider: string },
  ) {
    return this.paymentsService.createPayment(req.user.id, body.tariffId, body.provider);
  }

  // 🔹 Payme callback
  @Post('payme/callback')
  async paymeCallback(@Body() body: any) {
    // Payme’dan kelgan ma’lumotni tekshirib, update qilamiz
    return this.paymentsService.updatePaymentStatus(body.transactionId, body.status);
  }

  // 🔹 Click callback
  @Post('click/callback')
  async clickCallback(@Body() body: any) {
    return this.paymentsService.updatePaymentStatus(body.transactionId, body.status);
  }
}
