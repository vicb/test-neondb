import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log('before');
		await getDb().query.test.findFirst();
		console.log('after'); // hangs, never gets here
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;

function getDb() {
	const dbClient = new Pool({ connectionString: 'postgres://testdb:testdb@localhost:5442/testdb' });

	// necessary to make neon work locally, used to work fine.
	neonConfig.wsProxy = () => '127.0.0.1:5443/v1';
	neonConfig.useSecureWebSocket = false;
	neonConfig.pipelineTLS = false;
	neonConfig.pipelineConnect = false;

	return drizzle(dbClient, { schema, logger: true });
}
