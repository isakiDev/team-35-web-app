import { Inject, Injectable } from '@nestjs/common'
import { SendContractUseCase } from '../../domain/usecase/send-contract.usecase'
import { DOCUSEAL_SERVICE } from '../../domain/service/docuseal.service'
import type {DocusealService} from '../../domain/service/docuseal.service'

@Injectable()
export class SendContractImplUseCase implements SendContractUseCase {
  constructor(
    @Inject(DOCUSEAL_SERVICE)
    private readonly docusealService: DocusealService,
  ) {}

  execute(email: string): Promise<void> {
    return this.docusealService.sendContract(email)
  }
}