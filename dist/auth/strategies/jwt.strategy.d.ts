declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        email: any;
        role: any;
    }>;
}
export {};
