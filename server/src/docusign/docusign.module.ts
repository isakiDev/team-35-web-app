import { Module } from '@nestjs/common'
import { DOCUSEAL_SERVICE } from './domain/service/docuseal.service'
import { DocusealImplService } from './application/service/docuseal-impl.service'
import { DocuSignController } from './infrastructure/controller/docu-sign.controller'
import { SEND_CONTRACT_USE_CASE } from './domain/usecase/send-contract.usecase'
import { SendContractImplUseCase } from './application/usecase/send-contract-impl-use-case.service'

@Module({
  imports: [],
  controllers: [DocuSignController],
  providers: [
    {
      provide: DOCUSEAL_SERVICE,
      useClass: DocusealImplService,
    },
    {
      provide: SEND_CONTRACT_USE_CASE,
      useClass: SendContractImplUseCase,
    }]
})
export class DocusignModule {}