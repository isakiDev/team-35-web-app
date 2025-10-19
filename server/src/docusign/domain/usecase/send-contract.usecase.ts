export const SEND_CONTRACT_USE_CASE = 'SEND_CONTRACT_USE_CASE';

export interface SendContractUseCase {
  execute(email: string): Promise<void>;
}
