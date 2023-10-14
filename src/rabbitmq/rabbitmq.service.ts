import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.init();
  }

  async init() {
    this.connection = await amqp.connect(
      'amqps://pyfdiqem:81xk248VoXf3AsfjVnr3OomoJdsdra8X@hawk.rmq.cloudamqp.com/pyfdiqem',
    ); // Replace with your RabbitMQ connection URL
    this.channel = await this.connection.createChannel();

    // Additional setup if needed, such as creating queues or exchanges
    // await this.channel.assertQueue('my_queue', { durable: true });
  }

  async publishToQueue(queueName: string, message: any) {
    await this.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(message)),
    );
  }

  // Add additional methods as needed, such as consuming messages from queues
}
