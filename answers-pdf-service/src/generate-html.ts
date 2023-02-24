import { getCSS } from './style';
import nunjucks from 'nunjucks';
import { DenormVariantRevision } from './schemas';
import { AnswerTableRow, GenerateHTMLOptions } from './types';
import { stripMarkdowns } from './strip-markdowns';
const getTemplate = async () => `
<html>
<head>
	<style>{{css}}</style>
</head>
<body>
	<h1>Answers</h1>
	<table>
		<thead>
			<tr>
				{% if opts.includeGroups %}
					<th>#</th>
					<th>Group</th>
				{% endif %}
				{% if opts.includeSteps %}
					<th>#</th>
					<th>Step</th>
				{% endif %}
				<th>#</th>
				<th>Question</th>
				{% if opts.includeAnswerKeys %}
					<th>Key</th>
				{% endif %}
				<th>Answer</th>
			</tr>
		</thead>
		<tbody>
			{% for row in answerRows %}
				<tr>
					{% if opts.includeGroups %}
						<td>
							{{row.group.index}}
						</td>
						<td>
							{{row.group.label}}
						</td>
					{% endif %}
					{% if opts.includeSteps %}
						<td>
							{{row.step.index}}
						</td>
						<td>
							{{row.step.label}}
						</td>
					{% endif %}
					<td>
						{{row.question.index}}
					</td>
					<td>
						{{row.question.label}}
					</td>
					{% if opts.includeAnswerKeys %}
						<td>
							<code>{{row.key}}</code>
						</td>
					{% endif %}
					<td class="answer">
            {% if opts.includeSelectChoices and row.choices %}
              <div class="choices">
                {% for choice in row.choices %}
                  <span class="choice {% if row.answer == choice.value %}selected{% endif %}">
                    {{choice.value}}
                  </span>
                {% endfor %}
              </div>
            {% else %}
						  <b>{{row.answer}}</b>
            {% endif %}
					</td>
				</tr>
			{% endfor %}
		<tbody>
	</table>
</body>
</html>
`;

/**
 * For templating convenience, places an `answer` property on each question,
 * and flattens the whole thing into rows
 */
const getAnswerRows = async (
  { groups }: DenormVariantRevision,
  answers: Record<string, any>,
  options: GenerateHTMLOptions
): Promise<AnswerTableRow[]> => {
  return await Promise.all(
    groups.flatMap((group, groupIdx) => {
      let emittedGroup = false;
      return group.steps.flatMap((step, stepIdx) => {
        let emittedStep = false;
        return step.questions
          .filter((q) => {
            if (!options.includeInformationals && !q.schemaKey) {
              return false;
            }

            if (
              q.schemaKey &&
              !options.includeUnanswered &&
              answers[q.schemaKey] == null
            ) {
              return false;
            }

            return true;
          })

          .flatMap(async (question, questionIdx) => {
            const [groupLabel, stepLabel, questionLabel] = await stripMarkdowns(
              [group.label, step.label, question.label]
            );

            const row: AnswerTableRow = {
              question: {
                index: questionIdx + 1,
                label: questionLabel,
              },
            };

            if (question.schemaKey) {
              let answer = answers[question.schemaKey];
              if (typeof answer === 'object') {
                answer = JSON.stringify(answer, null, 2);
              }
              row.answer = answer;
            }

            if (!emittedGroup) {
              row.group = {
                index: groupIdx + 1,
                label: groupLabel,
              };
              emittedGroup = true;
            }

            if (!emittedStep) {
              row.step = {
                index: stepIdx + 1,
                label: stepLabel,
              };
              emittedStep = true;
            }

            row.key = question.schemaKey;

            if (question.choices) {
              row.choices = question.choices;
            }

            return row;
          });
      });
    })
  );
};

export const generateHTML = async ({
  answers,
  flowContent,
  options,
}: {
  answers: Record<string, any>;
  flowContent: DenormVariantRevision;
  options: GenerateHTMLOptions;
}) => {
  const css = await getCSS();
  const templateContent = await getTemplate();
  const answerRows = await getAnswerRows(flowContent, answers, options);

  options.includeGroups =
    options.includeGroups ?? flowContent.groups.length > 1;
  options.includeSteps =
    options.includeSteps ??
    (flowContent.groups.length > 1 || flowContent.groups[0].steps.length > 1);

  const context = {
    css,
    opts: options,
    answerRows,
  };
  return nunjucks.renderString(templateContent, context);
};
