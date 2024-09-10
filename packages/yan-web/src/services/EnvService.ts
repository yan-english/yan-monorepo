class EnvService {
    private static instance: EnvService
    public static getInstance(): EnvService {
        if (!EnvService.instance) {
            EnvService.instance = new EnvService()
        }

        return EnvService.instance
    }

    getBackendUrl(): string {
        return "http://localhost:3000"
    }
}
export const envService = EnvService.getInstance()