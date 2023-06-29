import { Injectable } from '@nestjs/common';
import AfricasTalking from 'africastalking';

@Injectable()
export class AfricastalkingService {
  private africasTalkingClient;

  constructor() {
    const username = process.env.AFRICASTALKING_USERNAME;
    const apiKey = process.env.AFRICASTALKING_APIKEY;

    this.africasTalkingClient = AfricasTalking({
      apiKey: apiKey,
      username: username,
    });
  }

  public async sendSMS(props: { to: string[]; message: string }) {
    const sms = this.africasTalkingClient.SMS;

    try {
      const response = await sms.send({
        to: props.to.join(','),
        message: props.message,
      });

      console.log('SMS sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      throw error;
    }
  }
}
