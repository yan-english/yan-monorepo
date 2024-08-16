import {Module, Provider} from "@nestjs/common";
import {CreateUserService} from "./application/user/command/create-user/create-user.service";
import {CreateUserHttpController} from "./application/user/command/create-user/create-user.http.controller";
import {UserRepository} from "./infrastructure/database/repositories/user.repository";
import {UserMapper} from "./mapper/user.mapper";
import {CqrsModule} from "@nestjs/cqrs";
import {USER_REPOSITORY} from "./infrastructure/di/user.di-tokens";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./infrastructure/database/entities/user.entity";

const repositories: Provider[] = [
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    },
];
const mappers: Provider[] = [UserMapper];
const commandHandlers: Provider[] = [CreateUserService];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserEntity as any]),
    ],
    controllers: [CreateUserHttpController],
    providers: [
        ...repositories,
        ...mappers,
        ...commandHandlers,
    ]
})
export class IdentifyModule{}