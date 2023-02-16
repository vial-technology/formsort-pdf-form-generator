import React, { useEffect, useState } from 'react';
import { getFlowContentJSONFromAPI } from '../src/flow-content-api';
import { generateHTML } from '../src/generate-html';
import { GenerateHTMLOptions } from '../src/types';

const dummyData = {
  variantRevisionUuid: 'c3928df8-4e08-45ab-8f18-ac6f52242ca7',
  answers: {
    current_step_id: '01234',
    have_drug_usage: false,
    type_of_insurance: 'private',
    referrer: '01234',
    other_diagnosis: '01234',
    accept_out_of_pocket: false,
    big_surgery: 'i_m_not_sure',
    is_private_insurance: false,
    is_state_supported: false,
    plan_to_use_insurance: false,
    i_agree_to_the_terms_of_use: false,
    dob: '2023-02-10',
    first_name: '01234',
    other_symptom: '01234',
    insurance_provider: '01234',
    last_time_used: 'more_than_6_months_ago',
    last_name: '01234',
    primary_insured_name: '01234',
    age: 42,
    state: 'GA',
    symptoms: ['cough'],
    existing_diagnosis: ['unsure'],
    group_id_optional: '01234',
    email: 'user+1676034158@example.com',
    is_qualified_age: false,
    member_id: '01234',
    phone: '01234',
  },
  responderUuid: 'c4f90042-6fe8-4a77-8295-e0a521d47b61',
};

export async function getServerSideProps() {
  // Fetch data from external API
  const options: GenerateHTMLOptions = {
    includeAnswerKeys: true,
    // includeInformationals: true,
    includeSteps: false,
    includeGroups: false,
    includeSelectChoices: true,
  };
  const flowContent = await getFlowContentJSONFromAPI(
    dummyData.variantRevisionUuid
  );
  const html = await generateHTML({
    answers: dummyData.answers,
    flowContent,
    options,
  });

  // Pass data to the page via props
  return { props: { html } };
}

const TestPage = ({ html }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default TestPage;
