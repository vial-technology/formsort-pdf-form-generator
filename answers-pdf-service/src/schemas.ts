import { z } from 'zod';

/**
 * This file was generated programmatically.
 *
 * The JSON schema for the FlowContent was obtained in the Formsort
 * API project:
 *
 * cd api
 * python
 * >>> from formsort.models.flow_content.definitions.denormalized import DenormVariantRevision
 * >>> DenormVariantRevision.schema_json()
 *
 *
 * Which was then placed into:
 * https://stefanterdell.github.io/json-schema-to-zod-react/
 */

export const DenormVariantRevisionModel = z.object({
  groups: z.array(
    z.object({
      enabledWhen: z.record(z.any()).optional(),
      label: z.string(),
      steps: z.array(
        z.object({
          enabledWhen: z.record(z.any()).optional(),
          label: z.string(),
          id: z.string().optional(),
          questions: z.array(
            z.object({
              enabledWhen: z.record(z.any()).optional(),
              label: z.string(),
              type: z.string(),
              schemaKey: z.string().optional(),
              choices: z
                .array(
                  z.object({
                    label: z.string(),
                    value: z.union([
                      z.string(),
                      z.boolean(),
                      z.number().int(),
                      z.number(),
                    ]),
                  })
                )
                .optional(),
              optional: z.boolean().optional(),
            })
          ),
          redirects: z
            .array(
              z.object({
                enabledWhen: z.record(z.any()).optional(),
                url: z.string(),
              })
            )
            .optional(),
        })
      ),
    })
  ),
  redirects: z
    .array(
      z.object({ enabledWhen: z.record(z.any()).optional(), url: z.string() })
    )
    .optional(),
  variables: z
    .object({
      external: z
        .record(z.object({ required: z.boolean().optional() }))
        .optional(),
      calculated: z.record(z.string()).optional(),
      api: z
        .record(
          z.object({
            apiUrl: z.union([
              z.string(),
              z.object({
                template: z.string(),
                answerKeysUsed: z.record(z.boolean()),
                fallback: z.string().optional(),
              }),
            ]),
            apiResultAccessor: z.string().optional(),
            mapperFn: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
});

export type DenormVariantRevision = z.infer<typeof DenormVariantRevisionModel>;
