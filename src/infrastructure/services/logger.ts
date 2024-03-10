export function logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`request: ${JSON.stringify(args)}`);
        return method.apply(this, args);
    }
}