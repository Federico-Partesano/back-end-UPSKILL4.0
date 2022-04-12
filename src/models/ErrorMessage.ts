type credentials = "password" | "user" | "email";

type Error = `wrong ${credentials}` | "error server" | "ok";
export interface ErrorMessage {
    message: Error
}