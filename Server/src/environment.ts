enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
}

class Environment {
    private environment: string;

    constructor(environment: string) {
        this.environment = environment;
    }

    getPort(): number {
        if (this.environment === Environments.dev_environment) {
            return 3001;
        } else {
            return 3001;
        }
    }
}

export default new Environment(Environments.local_environment);