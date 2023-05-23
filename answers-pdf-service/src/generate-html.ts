import { getCSS } from './style';
import nunjucks from 'nunjucks';
import { DenormVariantRevision } from './schemas';

const getTemplate = async () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Template</title>
    <style> {{css}} </style>
</head>
<body>
    {% for group in groups %}
        {% for step in group.steps %}
            {% for question in step.questions %}
                {% if question.type != "divider" and question.type != "informational" %}
                    <div class="question-wrapper">
                        <div class="label-container">
                            <p>{{ question.label }}</p>
                        </div>
                        <div class="input-container">
                {% endif %}
                    {% if question.type == "select" %}
                        {% for choice in question.choices %}
                            <div class="choice-wrapper">
                                <label for="{{ choice.value }}">{{ choice.label }}</label>
                                <input type="checkbox" id="{{ choice.value }}" name="{{ question.schemaKey }}" value="{{ choice.value }}">
                            </div>
                        {% endfor %}
                    {% elif question.type == "boolean" %}
                        {% for choice in question.choices %}
                            <div class="choice-wrapper">
                                <label for="{{ question.schemaKey }}-{{ choice.value }}">{{ choice.label }}</label>
                                <input type="radio" id="{{ question.schemaKey }}-{{ choice.value }}" name="{{ question.schemaKey }}" value="{{ choice.value }}">
                            </div>
                        {% endfor %}
                    {% elif question.type == "text" %}
                        <input type="text" id="{{ question.schemaKey }}" name="{{ question.schemaKey }}">
                    {% elif question.type == "number" %}
                        <input type="number" id="{{ question.schemaKey }}" name="{{ question.schemaKey }}">
                    {% elif question.type == "date" %}
                        <input type="date" id="{{ question.schemaKey }}" name="{{ question.schemaKey }}">
                    {% elif question.type == "informational" %}
                        <div class="informational-wrapper">{{ question.label|safe }}</div>
                    {% endif %}
                {% if question.type != "divider" and question.type != "informational" %}
                        </div>
                    </div>
                    <hr>
                {% endif %}
            {% endfor %}
        {% endfor %}
    {% endfor %}
</body>
</html>
`;

export const generateHTML = async ({
  answers,
  flowContent,
}: {
  answers: Record<string, any>;
  flowContent: DenormVariantRevision;
}) => {
  const css = await getCSS();
  const templateContent = await getTemplate();

  const context = {
    css,
    ...flowContent,
  };

  return nunjucks.renderString(templateContent, context);
};
