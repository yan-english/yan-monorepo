import {CreateUserProps} from "../../user.types";
import {CreateUserRequestDto} from "./create-user.request.dto";

export class CreateUserCommand {

    readonly username: string;
    readonly password: string;

    constructor(props: CreateUserRequestDto) {
        this.username = props.username;
        this.password = props.password;
    }

}