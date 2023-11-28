import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const orchestrator = () => {}

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("orchestrator-36-36-0f330c9c41c953707d7d", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('orchestrator-36-36-0f330c9c41c953707d7d', {
    connection: 'azureQueueConnection',
    queueName: '36-36-0f330c9c41c953707d7d',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});