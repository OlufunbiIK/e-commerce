import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../user/entities/user.entity';
export declare class MailProvider {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    WelcomeEmail(user: User): Promise<void>;
}
