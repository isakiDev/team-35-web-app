import { Injectable } from '@nestjs/common'
import { DocusealService } from '../../domain/service/docuseal.service'
import docuseal from '@docuseal/api'

@Injectable()
export class DocusealImplService implements DocusealService {
  constructor() {
    docuseal.configure({
      key: process.env.DOCUSEAL_API_KEY,
      url: 'https://api.docuseal.com',
    });
  }

  async sendContract(emailAddress: string): Promise<any> {
    const submission = await docuseal.createSubmission({
      template_id: 1908211,
      send_email: true,
      submitters: [
        {
          role: 'First Party',
          email: emailAddress,
        },
      ],
    })
    return submission
  }
}
