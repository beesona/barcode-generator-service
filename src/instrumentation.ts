import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_VERSION
} from '@opentelemetry/semantic-conventions';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const dotenv = require('dotenv').config();

const sdk = new NodeSDK({
    resource: new Resource({
        [SEMRESATTRS_SERVICE_NAME]: `${
            process.env.OTLP_SERVICE_NAME || 'onerail-barcode-service'
        }`,
        [SEMRESATTRS_SERVICE_VERSION]: `${
            process.env.OTLP_SERVICE_VERSION || '1.0.0'
        }`
    }),
    traceExporter: new OTLPTraceExporter({
        url: `${process.env.OTLP_ENDPOINT}/v1/traces`,
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {}
    }),
    instrumentations: [
        new PinoInstrumentation({
            logHook: (span, record, level) => {
                record['resource.service.name'] =
                    process.env.OTLP_SERVICE_NAME || 'onerail-barcode-service';
            },
            logKeys: {
                traceId: 'traceId',
                spanId: 'spanId',
                traceFlags: 'traceFlags'
            }
        }),
        new HttpInstrumentation(),
        new ExpressInstrumentation()
    ]
});

sdk.start();
