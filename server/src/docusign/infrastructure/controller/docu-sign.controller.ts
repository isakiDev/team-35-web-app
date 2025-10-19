import { Controller, Inject, Param, Post } from '@nestjs/common'
import {
  SEND_CONTRACT_USE_CASE
} from '../../domain/usecase/send-contract.usecase'
import type {SendContractUseCase} from '../../domain/usecase/send-contract.usecase'

@Controller('docuSign')
export class DocuSignController {
  constructor(
    @Inject(SEND_CONTRACT_USE_CASE)
    private readonly sendContractUseCase: SendContractUseCase,
  ) {}

  @Post('/:email')
  async sendContract(@Param('email') email: string) {
    return await this.sendContractUseCase.execute(email)
  }
}
